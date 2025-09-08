import { formatDateThai } from "@/app/(actions)/formathDate";
import { Iitem } from "@/types/item";

export default function TitleTestItem({ items }: { items: Iitem[] }) {
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Max Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Last Update
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id} className="bg-gray-900 border-b border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i.name}
                </th>
                <td className="px-6 py-4">{i.currentQuantity}</td>
                <td className="px-6 py-4">{i.maxQuantity}</td>
                <td className="px-6 py-4">{formatDateThai(i.lastUpdated,"2-digit")}</td>
                <td className="px-6 py-4">{i.status}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
