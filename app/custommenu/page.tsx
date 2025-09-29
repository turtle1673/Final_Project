"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useOrder } from "@/components/OrderProvider";
import Image from "next/image";

// ---------------- Navbar ----------------
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartTotalItems } = useOrder();
  
  return (
    <div className="fixed top-0 left-0 w-full bg-[#1A4365] text-white px-4 py-3 z-50">
      <div className="relative flex items-center justify-between">
        {/* ปุ่มกลับ */}
        <Link href="/customer" className="text-white hover:text-gray-200">
          ← ย้อนกลับ
        </Link>
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-md text-black bg-gray-200 w-64"
          />
        </div>
        
        <div className="flex items-center gap-3 ml-auto">
          {/* ปุ่มตะกร้า */}
          <Link href="/customer/cart" className="text-white hover:text-gray-200 relative">
            <ShoppingCart size={24} />
            {getCartTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartTotalItems()}
              </span>
            )}
          </Link>
          
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-4 mt-2 bg-white text-black rounded-md shadow-lg w-48 p-4">
          <h3 className="font-bold mb-2">Smoothies</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>
              <Link href="/customer" className="hover:underline">
                หน้าแรก
              </Link>
            </li>
            <li>
              <Link href="/customer/cart" className="hover:underline">
                ตะกร้าสินค้า ({getCartTotalItems()})
              </Link>
            </li>
            <li>
              <a href="#special" className="hover:underline">
                Today&rsquo;s Special
              </a>
            </li>
            <li>
              <a href="#menu" className="hover:underline">
                Menu
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

// ---------------- CustomMenu ----------------
export default function CustomMenu() {
  const { addOrder } = useOrder();
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name") || "เครื่องดื่ม";
  const price = Number(searchParams.get("price")) || 40;
  const image = searchParams.get("image") || "/drinks/milk.jpg";

  const [sweetness, setSweetness] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [topping, setTopping] = useState<string | null>(null);
  const [plasticglass, setPlasticglass] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const sweetnessOptions = [
    { label: "หวานมาก", value: "150%" },
    { label: "หวานปกติ", value: "100%" },
    { label: "หวานน้อย", value: "50%" },
    { label: "ไม่หวาน", value: "0%" },
  ];

  const typeOptions = useMemo(() => [
    { label: "ร้อน", value: "hot", price: 0 },
    { label: "เย็น", value: "cold", price: 0 },
    { label: "ปั่น", value: "blend", price: 5 },
  ], []);

  const toppingOptions = useMemo(() => [
    { label: "คาราเมล", value: "topping1", price: 5 },
    { label: "คอมเฟลก", value: "topping2", price: 5 },
    { label: "ช็อคโกเหลต", value: "topping3", price: 5 },
  ], []);

  const plasticglassOptions = useMemo(() => [
    { label: "S", value: "S", price: 0 },
    { label: "M", value: "M", price: 5 },
    { label: "L", value: "L", price: 10 },
  ], []);

  const isReadyToAdd = sweetness && type && plasticglass;

  // ✅ คำนวณราคาสุทธิ
  const totalPrice = useMemo(() => {
    let extra = 0;

    const selectedType = typeOptions.find((opt) => opt.value === type);
    if (selectedType) extra += selectedType.price;

    const selectedTopping = toppingOptions.find((opt) => opt.value === topping);
    if (selectedTopping) extra += selectedTopping.price;

    const selectedSize = plasticglassOptions.find((opt) => opt.value === plasticglass);
    if (selectedSize) extra += selectedSize.price;

    return (price + extra) * quantity;
  }, [price, type, topping, plasticglass, quantity]);

  const CustomRadio = ({ selected, onClick, label, subLabel }: {
    selected: boolean;
    onClick: () => void;
    label: string;
    subLabel?: string;
  }) => (
    <div
      onClick={onClick}
      className={`flex w-full items-center justify-between p-2 border rounded-md cursor-pointer min-h-[50px] ${
        selected ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"
      }`}
    >
      <span>
        {label}{" "}
        {subLabel && <span className="text-sm text-gray-500">{subLabel}</span>}
      </span>
      <div
        className={`w-5 h-5 rounded border flex items-center justify-center ${
          selected ? "bg-green-500 border-green-500" : "border-gray-400"
        }`}
      >
        {selected && <span className="text-white text-sm">✓</span>}
      </div>
    </div>
  );

  const CustomCheckbox = ({ checked, onClick, label, subLabel }: {
    checked: boolean;
    onClick: () => void;
    label: string;
    subLabel?: string;
  }) => (
    <div
      onClick={onClick}
      className={`flex w-full items-center justify-between p-2 border rounded-md cursor-pointer min-h-[50px] ${
        checked ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"
      }`}
    >
      <span>
        {label}{" "}
        {subLabel && <span className="text-sm text-gray-500">{subLabel}</span>}
      </span>
      <div
        className={`w-5 h-5 rounded border flex items-center justify-center ${
          checked ? "bg-green-500 border-green-500" : "border-gray-400"
        }`}
      >
        {checked && <span className="text-white text-sm">✓</span>}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto bg-[#f9f7f4] rounded-lg shadow p-4 w-100 text-black">
        {/* รูปสินค้า */}
        <div className="relative w-full">
          <img 
          src={image} 
          alt={name} 
          fill 
          className="w-full h-50 object-cover rounded-2xl" />
        </div>

        {/* ชื่อและราคา */}
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-lg font-bold text-black">{name}</h2>
          <span className="text-lg font-bold text-black">฿{totalPrice}</span>
        </div>

        {/* ตัวเลือก */}
        <div className="mt-4 space-y-4 max-h-[50vh] overflow-y-auto">
          <div>
            <h3 className="font-bold text-black">ระดับความหวาน</h3>
            <div className="space-y-1.5">
              {sweetnessOptions.map((opt) => (
                <CustomRadio
                  key={opt.value}
                  selected={sweetness === opt.value}
                  onClick={() => setSweetness(opt.value)}
                  label={opt.label}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-black">ชนิด</h3>
            <div className="space-y-1.5">
              {typeOptions.map((opt) => (
                <CustomRadio
                  key={opt.value}
                  selected={type === opt.value}
                  onClick={() => setType(opt.value)}
                  label={opt.label}
                  subLabel={opt.price > 0 ? `+${opt.price}` : ""}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-black">ทอปปิ้ง</h3>
            <div className="space-y-1.5">
              {toppingOptions.map((opt) => (
                <CustomCheckbox
                  key={opt.value}
                  checked={topping === opt.value}
                  onClick={() => (topping === opt.value ? setTopping(null) : setTopping(opt.value))}
                  label={opt.label}
                  subLabel={opt.price > 0 ? `+${opt.price}` : ""}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-black">ขนาดแก้ว</h3>
            <div className="space-y-1.5">
              {plasticglassOptions.map((opt) => (
                <CustomRadio
                  key={opt.value}
                  selected={plasticglass === opt.value}
                  onClick={() => setPlasticglass(opt.value)}
                  label={opt.label}
                  subLabel={opt.price > 0 ? `+${opt.price}` : ""}
                />
              ))}
            </div>
          </div>
        </div>

        {/* จำนวนและปุ่มเพิ่มตะกร้า */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg text-black"
            >
              -
            </button>
            <span className="w-6 text-center text-black">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg text-black"
            >
              +
            </button>
          </div>
          <button
            disabled={!isReadyToAdd}
            onClick={() => {
              if (!isReadyToAdd) return;
          
          // Map จางตัวเลือกให้ตรงกับไทป์ของระบบ
          const sweetnessMapping: Record<string, 'SWEETEST' | 'NORMAL' | 'LESS' | 'NO_SUGAR'> = {
            '150%': 'SWEETEST',
            '100%': 'NORMAL',
            '50%': 'LESS',
            '0%': 'NO_SUGAR'
          };
          
          const sizeMapping: Record<string, 'SMALL' | 'MEDIUM' | 'LARGE'> = {
            'S': 'SMALL',
            'M': 'MEDIUM',
            'L': 'LARGE'
          };
          
          addOrder({
            name,
            basePrice: price,
            sweetness: sweetnessMapping[sweetness!] || 'NORMAL',
            type,
            topping,
            plasticglass: sizeMapping[plasticglass!] || 'MEDIUM',
            quantity,
            image,
            totalPrice,
          });
          
          alert("เพิ่มไปยังตะกร้าแล้ว!");
          
          // เดินทางไปตะกร้าหรือกลับหน้า customer
          router.push('/customer');
        }}
            className={`flex-1 ml-4 py-2 rounded-lg font-bold transition-colors ${
              isReadyToAdd
                ? "bg-green-500 text-white"
                : "bg-[#F4E7E1] text-[#b5654a] cursor-not-allowed"
            }`}
          >
            เพิ่มไปยังตะกร้า
          </button>
        </div>
      </div>
    </>
  );
}