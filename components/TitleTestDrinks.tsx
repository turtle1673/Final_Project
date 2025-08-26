import { IDrink } from "@/types/drink"
import Image from "next/image"

export default function TitleTestDrinks({drinks}:{drinks:IDrink[]}) {
  return (
    <ul className="list-disc pl-6 text-black">
      {drinks.map((d) => (
        <li key={d.id}>{d.name}
        <Image
            src={d.img}
            alt="image"
            width={300}
            height={300}
        />
        </li>
      ))}
    </ul>
  )
}
