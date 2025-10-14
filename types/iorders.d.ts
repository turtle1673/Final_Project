import { Idrink } from "./idrink"

export interface Iorder {
  id:number
  addon:number
  drinkType:string | "COLD"
  sweetLevel:string
  cupSize:string
  amount:number
  totalPrice:number
  orderStatus:string
  createAt:string
  drink:Idrink
}