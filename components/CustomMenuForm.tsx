"use client";

import { useState } from "react";
import Image from "next/image";

export default function CustomMenu() {
  const basePrice = 0;

  const [sweetness, setSweetness] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [topping, setTopping] = useState<string[]>([]); 
  const [plasticglass, setPlasticglass] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const sweetnessOptions = [
    { label: "หวานมาก", value: "150%", price: 0 },
    { label: "หวานปกติ", value: "100%", price: 0 },
    { label: "หวานน้อย", value: "50%", price: 0 },
    { label: "ไม่หวาน", value: "0%", price: 0 },
  ];

  const typeOptions = [
    { label: "ร้อน", value: "hot", price: 0 },
    { label: "เย็น", value: "cold", price: 0 },
    { label: "ปั่น", value: "blend", price: 5 },
  ];

  const toppingOptions = [
    { label: "คาราเมล", value: "topping1", price: 5 },
    { label: "คอมเฟลก", value: "topping2", price: 5 },
    { label: "ช็อคโกแลต", value: "topping3", price: 5 },
  ];

  const plasticglassOptions = [
    { label: "S", value: "S", price: 0 },
    { label: "M", value: "M", price: 0 },
    { label: "L", value: "L", price: 0 },
  ];

  // คำนวณราคา
  const toppingExtra =
    topping.reduce((sum, t) => {
      const opt = toppingOptions.find((o) => o.value === t);
      return sum + (opt?.price || 0);
    }, 0) * quantity;

  const typeExtra =
    (typeOptions.find((t) => t.value === type)?.price || 0) * quantity;

  const totalPrice = basePrice * quantity + toppingExtra + typeExtra;

  // Component สำหรับ radio
  const CustomRadio = ({
    selected,
    onClick,
    label,
    subLabel,
  }: {
    selected: boolean;
    onClick: () => void;
    label: string;
    subLabel?: string;
  }) => (
    <div
      onClick={onClick}
      className={`flex w-100  items-center justify-between p-2 border rounded-md cursor-pointer ${
        selected
          ? "border-green-500 bg-green-50"
          : "border-gray-300 bg-white"
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

  // Component สำหรับ checkbox
  const CustomCheckbox = ({
    checked,
    onClick,
    label,
    subLabel,
  }: {
    checked: boolean;
    onClick: () => void;
    label: string;
    subLabel?: string;
  }) => (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-2 border rounded-md cursor-pointer ${
        checked
          ? "border-green-500 bg-green-50"
          : "border-gray-300 bg-white"
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
    <div className="max-w-md mx-auto bg-[#f9f7f4] rounded-lg shadow p-4 h-full mt-3">
      {/* รูปสินค้า */}
      <div className="relative w-full h-60">
        <Image
          src="/drinks/milk.jpg"
          alt="เครื่องดื่ม"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* ชื่อสินค้า */}
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-lg font-bold text-black">ชื่อเครื่องดื่ม</h2>
        <span className="text-lg font-bold text-black">฿{basePrice}</span>
      </div>
      <p className="text-gray-500">ราคาขั้นต้น</p>

      <div className="max-w-md mx-auto bg-[#f9f7f4] rounded-lg shadow flex flex-col max-h-[50vh]">
        <div className="flex-1 overflow-y-auto p-4">
      {/* ความหวาน */}
      <div className="mt-4">
        <div className="flex justify-between items-center font-bold border-b pb-1 text-black">
          <span>ระดับความหวาน</span>
          <span className="text-sm text-green-600">เลือก 1</span>
        </div>
        <div className="space-y-2 mt-2 text-black">
          {sweetnessOptions.map((opt) => (
            <CustomRadio
              key={opt.value}
              selected={sweetness === opt.value}
              onClick={() => setSweetness(opt.value)}
              label={`${opt.label} ${opt.value}`}
            />
          ))}
        </div>
      </div>

      {/* ชนิด */}
      <div className="mt-4">
        <div className="flex justify-between items-center font-bold border-b pb-1 text-black">
          <span>ชนิด</span>
          <span className="text-sm text-green-600">เลือก 1</span>
        </div>
        <div className="space-y-2 mt-2 text-black">
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

      {/* ทอปปิ้ง (เลือกได้หลายตัว) */}
      <div className="mt-4">
        <div className="flex justify-between items-center font-bold border-b pb-1 text-black">
          <span>ทอปปิ้ง</span>
          <span className="text-sm text-green-600">เลือกได้</span>
        </div>
        <div className="space-y-2 mt-2 text-black">
          {toppingOptions.map((opt) => (
            <CustomCheckbox
              key={opt.value}
              checked={topping.includes(opt.value)}
              onClick={() => {
                if (topping.includes(opt.value)) {
                  setTopping(topping.filter((t) => t !== opt.value));
                } else {
                  setTopping([...topping, opt.value]);
                }
              }}
              label={opt.label}
              subLabel={opt.price > 0 ? `+${opt.price}` : ""}
            />
          ))}
        </div>
      </div>

      {/* ขนาดแก้ว */}
      <div className="mt-4">
        <div className="flex justify-between items-center font-bold border-b pb-1 text-black">
          <span>ขนาดแก้ว</span>
          <span className="text-sm text-green-600 ">เลือก 1</span>
        </div>
        <div className="space-y-2 mt-2 text-black">
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
      </div>

      {/* จำนวน & ปุ่มเพิ่มตะกร้า */}
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
        <button className="flex-1 ml-4 py-2 rounded-lg bg-green-500 text-white font-bold">
          เพิ่มไปยังตะกร้า - {totalPrice}
        </button>
      </div>
    </div>
  );
}
