"use client"

import { Iuser } from "@/types/iuser"
import { useEffect, useState } from "react"
import TitleTestLoading from "./TitleTestLoading"

export default function titleTestEditStaff({id} : {id:string}) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<Iuser | null>(null)

    const fetchUser = async () => {
        try{
            const res = await fetch(`/api/user/${id}`)
            const json = await res.json()
            if(!res.ok){
                throw new Error( json.error || "fetch user error")
            }
            setUser(json.data)
            console.log(json.data)
        }catch(err:any){
            alert(err.message)
            console.log(err)
        }finally{
            setLoading(false)
        }
    }


    useEffect(() => {
        if(id){
            fetchUser()
        }
    },[])

    if(loading) return <TitleTestLoading />

  return (
    <>
    <h1>Client component</h1>
    <p>ID : {id}</p>
    <div className=" bg-orange-200">
        <div>{user?.name}</div>
        <div>{user?.role}</div>
        <div>{user?.email}</div>
    </div>
    
    </>
  )
}
