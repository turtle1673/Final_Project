"use client"
import TitleTestDrinks from "@/components/TitleTestDrinks"
import { IDrink } from "@/types/drink"
import { useState,useEffect } from "react"

export default function drinksPage() {
const [drinks,setDrinks] = useState<IDrink[]>([])
const [loading, setLoading] = useState(true)
useEffect(() => {
    async function fetchDrinks(){
        try{
            const res = await fetch("/api/drink")
            const data = await res.json()
            if(!res.ok){
                console.log(data.message)
            }
            console.log(data)
            setDrinks(data)
        }catch(err:any){
        console.log("error in fetching data" + err)
        } finally {
            setLoading(false)
        }
    }

    fetchDrinks()
},[])
if(loading) return <div>loading...</div>

return (
    <>
    <h1 className="text-black">Hello</h1>
    <TitleTestDrinks drinks={drinks}/>
    </>
    )
}
