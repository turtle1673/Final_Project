import ManagerAllOrders from '@/components/ManagerAllOrders'
import ManagerOrdersStats from '@/components/ManagerOrderStats'
import React from 'react'


export default function employeeAccounts() {
  return (
    <>
      <h1 className="text-3xl text-teal-600 font-bold mb-6">Manager Dashboard</h1>
      <div className='flex justify-between'>
        <ManagerOrdersStats />
          <ManagerAllOrders />
      </div>
    </>    
  )
}
