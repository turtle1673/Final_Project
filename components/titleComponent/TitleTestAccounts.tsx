import formatToThaiDate from "@/lib/functions/formatToThaiDate";
import { Iuser } from "@/types/iuser";
import Link from "next/link";

export default async function TitleTestAccounts({ accounts }: { accounts: Iuser[] }) {

  return (
    <>
    
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-teal-400 to-blue-400 text-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Position
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Lastest Update
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Create Date
            </th>
            <th scope="col" className="px-6 py-3 text-right font-bold uppercase tracking-wider">
              <Link href={"employee-accounts/create-employee-account"} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Add new account
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {accounts.map(emp => (
            <tr key={emp.id} className="hover:bg-blue-50 transition">
              <td className="px-6 py-4 font-medium text-gray-800">{emp.name}</td>
              <td className="px-6 py-4 text-gray-700">{emp.email}</td>
              <td className="px-6 py-4 text-teal-600 font-semibold">{emp.role}</td>
              <td className="px-6 py-4 text-gray-500">{formatToThaiDate(emp.lastest_update)}</td>
              <td className="px-6 py-4 text-gray-500">{formatToThaiDate(emp.create_at,"long")}</td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`employee-accounts/${emp.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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