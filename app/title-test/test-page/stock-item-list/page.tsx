"use client"
import TitleTestItem from "@/components/TitleTestItem";
import { Iitem } from "@/types/item";
import { useEffect, useState } from "react";

export default function page() {
    const [items,setItems] = useState<Iitem[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchDrinks(){
            try{
                const res = await fetch("/api/stockItem")
                const data = await res.json()
                if(!res.ok){
                    console.log(data.message)
                }
                console.log(data)
                setItems(data)
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
    <TitleTestItem items={items}/>
    </>
  )
}
