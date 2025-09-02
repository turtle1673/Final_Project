import { IDrink } from "@/types/drink"
import Image from "next/image"

export default function TitleTestDrinks({drinks}:{drinks:IDrink[]}) {
  return (
    <ul className="list-disc pl-6 text-black border grid grid-cols-4 gap-6">
      {drinks.map((d) => (
        <p key={d.id}>{d.name}
        <Image
            src={d.img}
            alt="image"
            width={300}
            height={300}
        />
        <button className="bg-green-400">
        <a href={`test-drinks/${d.id}`}>Order now</a>
        </button>
        </p>
      ))}
    </ul>
  )
}
