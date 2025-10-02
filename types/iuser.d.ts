import { Iorder } from "./iorders"

export interface Iuser {
    id:string
    name:string
    email:string
    role:string
    createAt:string
    updateAt:string

    orders:Iorder[]
}