import { Irestock } from "@/types/irestock";
import TitleTestLoading from "./titleComponent/TitleTestLoading";
import formatToThaiDate from "@/lib/functions/formatToThaiDate";
import DeleterRefillHistoryButton from "./DeleterRefillHistoryButton";


export default function RefillLogs({historiesData} : {historiesData : Irestock[]}) {
    if(!historiesData) return <TitleTestLoading />
    if(historiesData.length === 0) return <p>no data</p>
  return (
    <>
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-teal-400 to-blue-400 text-white">
          <tr className="text-xl">
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              ชื่อพนักงาน
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              ชื่อรายการ
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              จำนวนที่เติม
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              จำนวนเก่า
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              จำนวนหลังเติม
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              วันที่อัพเดท
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
                <DeleterRefillHistoryButton/>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {historiesData.map(e => (
            <tr key={e.id} className="hover:bg-blue-50 transition">
              <td className="px-6 py-4 font-semibold text-teal-600">{e.employee?.name ? e.employee.name : <p>บัญชีโดนลบ</p> }</td>
              <td className="px-6 py-4 font-semibold text-teal-600">{e.stockItem.name}</td>
              <td className="px-6 py-4 text-gray-700">{e.newQuantity}</td>
              <td className="px-6 py-4 text-gray-700">{e.oldQuantity}</td>
              <td className="px-6 py-4 text-gray-500">{e.totalQuantity}</td>
              <td className="px-6 py-4 text-gray-500">{formatToThaiDate(e.createAt)}</td>
              <td className="px-6 py-4 text-gray-500"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
