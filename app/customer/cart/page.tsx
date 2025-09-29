"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOrder, CartItem, SubmittedOrder } from "@/components/OrderProvider";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, submittedOrders, updateOrder, removeOrder, clearCart, getTotalPrice, getCartTotalItems, fetchSubmittedOrders } = useOrder();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'cart' | 'orders'>('cart');

  // Auto-refresh submitted orders every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSubmittedOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchSubmittedOrders]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeOrder(id);
    } else {
      // คำนวณราคาใหม่
      const item = cartItems.find(item => item.id === id);
      if (item) {
        const basePrice = item.basePrice;
        let extra = 0;
        
        // คำนวณราคาเพิ่มเติมตามตัวเลือก
        if (item.type === 'blend') extra += 5;
        if (item.topping === 'topping1' || item.topping === 'topping2' || item.topping === 'topping3') extra += 5;
        if (item.plasticglass === 'M') extra += 5;
        if (item.plasticglass === 'L') extra += 10;
        
        updateOrder(id, { 
          quantity: newQuantity,
          totalPrice: (basePrice + extra) * newQuantity
        });
      }
    }
  };

  // Function to convert cart items to order format
  const convertCartItemsToOrders = async (cartItems: CartItem[]) => {
    try {
      // First, get all drinks to find the drinkId by name
      const drinksResponse = await fetch('/api/drink');
      const drinksData = await drinksResponse.json();
      
      if (!drinksResponse.ok) {
        throw new Error('Failed to fetch drinks');
      }
      
      const orders = cartItems.map(item => {
        // Find drink by name to get drinkId
        const drink = drinksData.data.find((d: { id: number; name: string }) => d.name === item.name);
        
        // Map sweetness values to database format
        const sweetnessMapping: Record<string, string> = {
          'SWEETEST': 'MORE_SUGAR',
          'NORMAL': 'NORMAL_SUGAR', 
          'LESS': 'LESS_SUGAR',
          'NO_SUGAR': 'NO_SUGAR'
        };
        
        // Map type values to database format
        const typeMapping: Record<string, string> = {
          'hot': 'HOT',
          'cold': 'COLD',
          'blend': 'MIXED'
        };
        
        // Map size values to database format
        const sizeMapping: Record<string, string> = {
          'SMALL': 'SMALL',
          'MEDIUM': 'MEDIUM', 
          'LARGE': 'LARGE'
        };
        
        return {
          drinkId: drink?.id || 1, // Default to 1 if drink not found
          cupSize: sizeMapping[item.plasticglass] || 'MEDIUM',
          sweetLevel: sweetnessMapping[item.sweetness] || 'NORMAL_SUGAR',
          drinkType: typeMapping[item.type] || 'COLD',
          amount: item.quantity,
          addon: item.topping ? 1 : null // Simple addon flag
        };
      });
      
      return orders;
    } catch (error) {
      console.error('Error converting cart items:', error);
      throw error;
    }
  };

  // Function to submit orders
  const handleCheckout = async () => {
    try {
      const orders = await convertCartItemsToOrders(cartItems);
      
      // Submit each order to the API
      const orderPromises = orders.map(order => 
        fetch('/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order)
        })
      );
      
      const responses = await Promise.all(orderPromises);
      
      // Check if all orders were successful
      const allSuccessful = responses.every(response => response.ok);
      
      if (allSuccessful) {
        alert('สั่งซื้อสำเร็จ! รายการของคุณถูกส่งไปยังพนักงานแล้ว');
        clearCart();
        // Refresh submitted orders and switch to orders tab
        await fetchSubmittedOrders();
        setActiveTab('orders');
      } else {
        throw new Error('Some orders failed to submit');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('เกิดข้อผิดพลาดในการสั่งซื้อ กรุณาลองใหม่อีกครั้ง');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock size={16} className="text-yellow-600" />;
      case 'COMPLETED':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'CANCELLED':
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'รอดำเนินการ';
      case 'COMPLETED':
        return 'เสร็จสิ้น';
      case 'CANCELLED':
        return 'ยกเลิก';
      default:
        return 'ไม่ทราบสถานะ';
    }
  };

  const convertOrderToCartFormat = (order: {
    id: number;
    addon: number | null;
    drinkType: string;
    sweetLevel: string;
    cupSize: string;
    orderStatus: string;
    orderDate: string;
    amount: number;
    drinkId: number;
    drink: {
      price: number;
      name: string;
      img: string | null;
    };
  }): SubmittedOrder => {
    // Map sweetness values back to display format
    const sweetnessMapping: Record<string, string> = {
      'MORE_SUGAR': 'SWEETEST',
      'NORMAL_SUGAR': 'NORMAL',
      'LESS_SUGAR': 'LESS',
      'NO_SUGAR': 'NO_SUGAR'
    };

    // Map type values back to display format
    const typeMapping: Record<string, string> = {
      'HOT': 'hot',
      'COLD': 'cold',
      'MIXED': 'blend'
    };

    // Map size values back to display format
    const sizeMapping: Record<string, string> = {
      'SMALL': 'SMALL',
      'MEDIUM': 'MEDIUM',
      'LARGE': 'LARGE'
    };

    // Calculate total price including extras
    const basePrice = order.drink.price;
    let extra = 0;
    
    if (order.drinkType === 'MIXED') extra += 5;
    if (order.addon) extra += 5;
    if (order.cupSize === 'MEDIUM') extra += 5;
    if (order.cupSize === 'LARGE') extra += 10;

    const totalPrice = (basePrice + extra) * order.amount;

    return {
      id: order.id,
      name: order.drink.name,
      basePrice: basePrice,
      sweetness: sweetnessMapping[order.sweetLevel] || 'NORMAL',
      type: typeMapping[order.drinkType] || 'cold',
      topping: order.addon ? 'topping1' : null,
      plasticglass: sizeMapping[order.cupSize] || 'MEDIUM',
      quantity: order.amount,
      image: order.drink.img || '/public/default-drink.jpg',
      totalPrice: totalPrice,
      orderStatus: order.orderStatus as 'PENDING' | 'COMPLETED' | 'CANCELLED',
                orderDate: order.orderDate,
                drinkId: order.drinkId
    };
  };

  const renderSubmittedOrder = (order: { 
    id: number; 
    orderStatus: string; 
    orderDate: string; 
    drinkId: number;
    addon: number | null;
    drinkType: string;
    sweetLevel: string;
    cupSize: string;
    amount: number;
    drink: { price: number; name: string; img: string | null };
  }) => {
    const convertedOrder = convertOrderToCartFormat(order);
    
    return (
      <div key={order.id} className="bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow-sm">
        <div className="flex items-start gap-4">
          {/* รูปภาพ */}
          <img
            src={convertedOrder.image}
            alt={convertedOrder.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          
          {/* รายละเอียดสินค้า */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg text-black">{convertedOrder.name}</h3>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(convertedOrder.orderStatus)}`}>
                {getStatusIcon(convertedOrder.orderStatus)}
                <span className="ml-1">{getStatusText(convertedOrder.orderStatus)}</span>
              </span>
            </div>
            
            <div className="text-sm text-gray-600 mt-1 space-y-1">
              <div><strong>ความหวาน:</strong> {
                convertedOrder.sweetness === 'SWEETEST' ? 'หวานมาก (150%)' :
                convertedOrder.sweetness === 'NORMAL' ? 'หวานปกติ (100%)' :
                convertedOrder.sweetness === 'LESS' ? 'หวานน้อย (50%)' :
                convertedOrder.sweetness === 'NO_SUGAR' ? 'ไม่หวาน (0%)' : convertedOrder.sweetness
              }</div>
              
              <div><strong>ชนิด:</strong> {
                convertedOrder.type === 'hot' ? 'ร้อน' :
                convertedOrder.type === 'cold' ? 'เย็น' :
                convertedOrder.type === 'blend' ? 'ปั่น' : convertedOrder.type
              }</div>
              
              <div><strong>ขนาด:</strong> {
                convertedOrder.plasticglass === 'SMALL' ? 'S' :
                convertedOrder.plasticglass === 'MEDIUM' ? 'M' :
                convertedOrder.plasticglass === 'LARGE' ? 'L' : convertedOrder.plasticglass
              }</div>
              
              {convertedOrder.topping && (
                <div><strong>ทอปปิ้ง:</strong> {
                  convertedOrder.topping === 'topping1' ? 'คาราเมล' :
                  convertedOrder.topping === 'topping2' ? 'คอมเฟลก' :
                  convertedOrder.topping === 'topping3' ? 'ช็อคโกแลต' : convertedOrder.topping
                }</div>
              )}
              
              <div><strong>หมายเลขออเดอร์:</strong> #{order.id}</div>
              <div><strong>วันที่สั่ง:</strong> {new Date(convertedOrder.orderDate).toLocaleDateString('th-TH')}</div>
            </div>
          </div>
          
          {/* ราคาและจำนวน */}
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="font-bold text-lg text-black">฿{convertedOrder.totalPrice}</div>
              <div className="text-sm text-gray-500">฿{convertedOrder.basePrice} เบื้องต้น</div>
              <div className="text-sm text-gray-500">จำนวน: {convertedOrder.quantity} ชิ้น</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCartItem = (item: CartItem) => (
    <div key={item.id} className="bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex items-start gap-4">
        {/* รูปภาพ */}
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        
        {/* รายละเอียดสินค้า */}
        <div className="flex-1">
          <h3 className="font-bold text-lg text-black">{item.name}</h3>
          
          <div className="text-sm text-gray-600 mt-1 space-y-1">
            <div><strong>ความหวาน:</strong> {
              item.sweetness === 'SWEETEST' ? 'หวานมาก (150%)' :
              item.sweetness === 'NORMAL' ? 'หวานปกติ (100%)' :
              item.sweetness === 'LESS' ? 'หวานน้อย (50%)' :
              item.sweetness === 'NO_SUGAR' ? 'ไม่หวาน (0%)' : item.sweetness
            }</div>
            
            <div><strong>ชนิด:</strong> {
              item.type === 'hot' ? 'ร้อน' :
              item.type === 'cold' ? 'เย็น' :
              item.type === 'blend' ? 'ปั่น' : item.type
            }</div>
            
            <div><strong>ขนาด:</strong> {
              item.plasticglass === 'SMALL' ? 'S' :
              item.plasticglass === 'MEDIUM' ? 'M' :
              item.plasticglass === 'LARGE' ? 'L' : item.plasticglass
            }</div>
            
            {item.topping && (
              <div><strong>ทอปปิ้ง:</strong> {
                item.topping === 'topping1' ? 'คาราเมล' :
                item.topping === 'topping2' ? 'คอมเฟลก' :
                item.topping === 'topping3' ? 'ช็อคโกแลต' : item.topping
              }</div>
            )}
          </div>
        </div>
        
        {/* ปุ่มควบคุมและราคา */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <div className="font-bold text-lg text-black">฿{item.totalPrice}</div>
            <div className="text-sm text-gray-500">฿{item.basePrice} เบื้องต้น</div>
          </div>
          
          {/* ปุ่มควบคุมจำนวน */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg"
            >
              <Minus size={16} />
            </button>
            
            <span className="w-6 text-center font-bold">{item.quantity}</span>
            
            <button
              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg"
            >
              <Plus size={16} />
            </button>
          </div>
          
          {/* ปุ่มลบ */}
          <button
            onClick={() => removeOrder(item.id)}
            className="text-red-500 hover:text-red-700 p-2"
            title="ลบสินค้า"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );


  return (
    <div className="pt-20 min-h-screen bg-[#F6EEE0] px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Tab Navigation */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold text-black">ตะกร้าและการสั่งซื้อ</h1>
            </div>
            
            {activeTab === 'cart' && (
              <button
                onClick={() => {
                  if (confirm("คุณแน่ใจหรือไม่ที่จะลบสินค้าทั้งหมดจากตะกร้า?")) {
                    clearCart();
                  }
                }}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ล้างตะกร้า
              </button>
            )}
          </div>
          
          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('cart')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'cart'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ShoppingCart size={16} className="inline mr-2" />
              ตะกร้าสินค้า ({getCartTotalItems()})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Clock size={16} className="inline mr-2" />
              คำสั่งซื้อ ({submittedOrders.length})
            </button>
          </div>
          
          <div className="text-sm text-gray-600 mt-2">
            {activeTab === 'cart' ? `รวม ${getCartTotalItems()} รายการ` : `มี ${submittedOrders.length} คำสั่งซื้อ`}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'cart' ? (
          <>
            {/* รายการสินค้าในตะกร้า */}
            {cartItems.length === 0 ? (
              <div className="bg-white border border-gray-300 rounded-lg p-8 text-center">
                <ShoppingCart size={64} className="mx-auto mb-4 text-gray-400" />
                <h2 className="text-xl font-bold text-gray-600 mb-2">ตะกร้าว่างเปล่า</h2>
                <p className="text-gray-500 mb-4">ยังไม่มีสินค้าในตะกร้าของคุณ</p>
                <Link 
                  href="/customer"
                  className="bg-[#1A4365] text-white px-6 py-3 rounded-lg hover:bg-[#1E587A] transition-colors inline-block"
                >
                  เลือกรายการสินค้า
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(renderCartItem)}
              </div>
            )}

            {/* สรุปราคาสำหรับตะกร้า */}
            {cartItems.length > 0 && (
              <div className="bg-white border border-gray-300 rounded-lg p-6 mt-6 shadow-sm">
                <div className="flex justify-between items-center text-xl font-bold text-black mb-4">
                  <span>ยอดรวมทั้งหมด:</span>
                  <span>฿{getTotalPrice()}</span>
                </div>
                
                <div className="flex gap-4">
                  <Link 
                    href="/customer"
                    className="flex-1 bg-gray-500 text-white text-center py-3 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    เลือกรายการเพิ่มเติม
                  </Link>
                  
                  <button 
                    className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
                    onClick={handleCheckout}
                  >
                    ชำระเงิน (฿{getTotalPrice()})
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* รายการคำสั่งซื้อ */}
            {submittedOrders.length === 0 ? (
              <div className="bg-white border border-gray-300 rounded-lg p-8 text-center">
                <Clock size={64} className="mx-auto mb-4 text-gray-400" />
                <h2 className="text-xl font-bold text-gray-600 mb-2">ยังไม่มีคำสั่งซื้อ</h2>
                <p className="text-gray-500 mb-4">คุณยังไม่ได้ส่งคำสั่งซื้อใดๆ</p>
                <button
                  onClick={() => setActiveTab('cart')}
                  className="bg-[#1A4365] text-white px-6 py-3 rounded-lg hover:bg-[#1E587A] transition-colors"
                >
                  ดูตะกร้าสินค้า
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* จัดเรียงตามสถานะและวันที่ล่าสุดก่อน */}
                {submittedOrders
                  .sort((a, b) => {
                    // จัดเรียงตามสถานะ: PENDING ก่อน, แล้วตาม COMPLETED, แล้วตาม CANCELLED
                    const statusOrder = { 'PENDING': 1, 'COMPLETED': 2, 'CANCELLED': 3 };
                    const statusComparison = statusOrder[a.orderStatus] - statusOrder[b.orderStatus];
                    if (statusComparison !== 0) return statusComparison;
                    // หากสถานะเหมือนกัน ใช้วันที่ใหม่ก่อน
                    return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
                  })
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  .map((order: any) => renderSubmittedOrder(order))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
