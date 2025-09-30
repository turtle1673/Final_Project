import { use } from "react"

export default function DrinkDetails({params} : {params : Promise<{id : string}>}) {
    const {id} = use(params)
  return (
    <div>Drink id {id}</div>
  )
}
