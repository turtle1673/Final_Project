import { Idrink } from '@/types/idrink'
import Link from 'next/link'

export default function DrinksMenu({ drinks }: { drinks: Idrink[] }) {
    return (
        <>
            {drinks.map(d => (
                <div
                    key={d.id}
                    className="col-span-1 flex h-fit items-center gap-4 p-4 border border-teal-200 bg-white"
                >
                    {/* รูปเครื่องดื่ม */}
                    <div className="w-24 h-24 rounded-md overflow-hidden border border-blue-200">
                        <img
                            src={d.img}
                            alt="drink image"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* รายละเอียด */}
                    <div className="flex flex-col flex-1">
                        <p className="text-lg font-semibold text-teal-700">{d.name}</p>
                        <button
                            className="mt-2 px-3 py-1 rounded-md bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition"
                        >
                            <Link href={`drinks-menu/${d.id}`}>
                                ราคา {d.price} บาท
                            </Link>
                        </button>
                    </div>
                </div>

            )
            )}

        </>

    )
}