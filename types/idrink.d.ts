import { Iitem } from "./item"

interface Ingredient {
    id:string
    quantity:string
    stockItem:Iitem
}
export interface Idrink {
    id : string,
    name : string,
    price : number,
    img : string | "no image",
    createAt: string
    updateAt : string
    ingredients:Ingredient[]
}