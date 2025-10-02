import ManagerOrdersStats from '@/components/ManagerOrderStats'
import React from 'react'


export default function employeeAccounts() {
  return (
    <>
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>
    <ManagerOrdersStats />
    </div>
    </>    
  )
}
