import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Iuser } from '@/types/iuser'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function EmployeeDetails() {
    const data = await getServerSession(authOptions)
    const userSessionId = data?.user.id
    const baseUrl = process.env.PUBLIC_BASE_URL
    console.log("id from employee detail : " + userSessionId)
    const res = await fetch(`${baseUrl}/api/user/${userSessionId}`)
    const json = await res.json()
    if (!res.ok) {
        throw new Error(json.error || "Error fetching data")
    }
    const staffData:Iuser = json.data

  return (
    <div>Employee {staffData.name} Details</div>
  )
}
