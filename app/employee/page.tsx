import EmployeeDetails from "@/components/EmployeeDetails"


export default function EmployeePage() {
  
  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br py-8 px-2">
      <section className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
        <header className="flex flex-col items-center mb-4">
          <img src="/IMAGES/smoothielogo.png" alt="Logo" className="w-20 h-20 mb-2" />
          <h1 className="text-3xl font-bold text-blue-700">Employee Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome! Here you can view your details and manage your tasks.</p>
        </header>
        <div className="border-t border-gray-200 pt-6">
          <EmployeeDetails />
        </div>
      </section>
    </main>
  )
}
