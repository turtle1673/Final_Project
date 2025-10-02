import formatToThaiDate from "@/lib/functions/formatToThaiDate";
import { Iuser } from "@/types/iuser";
import Link from "next/link";

export default async function TitleTestAccounts({ accounts }: { accounts: Iuser[] }) {

  return (
    <>
    
      <table className="min-w-full">
        <thead className="bg-gradient-to-r from-teal-400 to-blue-400 text-white">
          <tr className="text-xl">
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              ชื่อพนักงาน
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              อีเมล
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              ตำแหน่ง
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              อัพเดทเมื่อวันที่
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              วันที่เข้าร่วม
            </th>
            <th scope="col" className="px-6 py-3 text-right font-bold uppercase tracking-wider">
              <Link href={"accounts-management/create-employee-account"} className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition">
                เพิ่มบัญชีพนักงาน
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {accounts.map(emp => (
            <tr key={emp.id} className="hover:bg-blue-50 transition">
              <td className="px-6 py-4 font-semibold text-teal-600">{emp.name}</td>
              <td className="px-6 py-4 text-gray-700">{emp.email}</td>
              <td className="px-6 py-4 text-teal-600 font-semibold">{emp.role}</td>
              <td className="px-6 py-4 text-gray-500">{formatToThaiDate(emp.updateAt)}</td>
              <td className="px-6 py-4 text-gray-500">{formatToThaiDate(emp.createAt,"long")}</td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`accounts-management/${emp.id}`}
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
                >
                  Manage
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </>
  )
}