import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function EmployeeDetails() {
  const session = await getServerSession(authOptions);
  const userSessionId = session?.user.id;

  if (!userSessionId)
    return <p className="text-center mt-10">ไม่พบข้อมูลผู้ใช้งาน</p>;

  const staffData = await prisma.user.findUnique({
    where: { id: userSessionId },
    include: { orders: true },
  });

  if (!staffData) return <p className="text-center mt-10">ไม่พบข้อมูลพนักงาน</p>;

  // สถิติ
  const totalOrders = staffData.orders.length;
  const completedOrders = staffData.orders.filter(
    (o) => o.orderStatus === "COMPLETED"
  ).length
  const cancelledOrders = staffData.orders.filter(
    (o) => o.orderStatus === "CANCELLED"
  ).length;
  const totalRevenue = staffData.orders
    .filter((o) => o.orderStatus === "COMPLETED")
    .reduce((sum, o) => sum + o.totalPrice, 0);
  const avgOrderValue =
    completedOrders > 0 ? (totalRevenue / completedOrders).toFixed(2) : 0;

  return (
    <div className="w-full h-fit flex bg-teal-50">
      {/* ฝั่งซ้าย */}
      <div className="w-2/3 p-8 space-y-8 overflow-y-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-teal-700">
          Dashboard พนักงาน
        </h1>

        {/* Employee Info */}
        <div className="bg-white p-6 shadow rounded w-full">
          <p className="text-lg text-teal-800">
            <strong>ชื่อ:</strong> {staffData.name}
          </p>
          <p className="text-lg text-teal-800">
            <strong>Email:</strong> {staffData.email}
          </p>
          <p className="text-lg text-teal-800">
            <strong>วันที่เริ่มงาน:</strong>{" "}
            {staffData.createAt.toLocaleDateString()}
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow rounded flex flex-col justify-center items-center">
            <p className="text-sm text-teal-500">คำสั่งซื้อที่ปิดไปแล้ว</p>
            <p className="text-3xl font-bold text-teal-700">{totalOrders}</p>
          </div>
          <div className="bg-white p-6 shadow rounded flex flex-col justify-center items-center">
            <p className="text-sm text-teal-500">คำสั่งซื้อที่ปิดสำเร็จ</p>
            <p className="text-3xl font-bold text-teal-700">{completedOrders}</p>
          </div>
          <div className="bg-white p-6 shadow rounded flex flex-col justify-center items-center">
            <p className="text-sm text-teal-500">คำสั่งซื้อที่กดยกเลิก</p>
            <p className="text-3xl font-bold text-teal-700">
              {cancelledOrders}
            </p>
          </div>
        </div>

        {/* Revenue / Avg */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 shadow rounded flex flex-col justify-center items-center">
            <p className="text-sm text-teal-500">ทำยอดขายให้ทางร้านไปแล้ว</p>
            <p className="text-3xl font-bold text-teal-700">
              {totalRevenue} บาท
            </p>
          </div>
          <div className="bg-white p-6 shadow rounded flex flex-col justify-center items-center">
            <p className="text-sm text-teal-500">ค่าเฉลี่ยยอดขายต่อรายการคำสั่งซื้อ</p>
            <p className="text-3xl font-bold text-teal-700">
              {avgOrderValue} บาท
            </p>
          </div>
        </div>
      </div>

      {/* ฝั่งขวา (Orders List) */}
      <div className="w-1/3 p-8 bg-white shadow-inner overflow-hidden flex flex-col">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">
          Orders ที่ปิดไปแล้วทั้งหมด
        </h2>
        <div className="overflow-y-auto flex-1 space-y-3 pr-2">
          {staffData.orders.map((o) => (
            <div
              key={o.id}
              className="flex justify-between items-center p-4 bg-teal-50 rounded"
            >
              <div>
                <p className="text-sm">
                  <strong>ID:</strong> {o.id}
                </p>
                <p className="text-sm">
                  <strong>Drink:</strong> {o.drinkType} | {o.amount} แก้ว | 
                  {o.totalPrice} ฿
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded font-semibold text-white text-sm ${
                  o.orderStatus === "COMPLETED"
                    ? "bg-teal-600"
                    : o.orderStatus === "PENDING"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {o.orderStatus}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
