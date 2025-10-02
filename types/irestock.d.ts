import { Iitem } from "./item"
import { Iuser } from "./iuser"

export interface Irestock {
  id:string
  oldQuantity:number
  newQuantity:number
  totalQuantity:number
  createAt:string

  employee:Iuser
  stockItem:Iitem
}