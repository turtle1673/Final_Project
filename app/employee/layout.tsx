import EmployeeNav from "@/components/titleComponent/EmployeeNav"

export default function LayoutEmployee({ children } : {children : React.ReactNode}) {
  return (
    <>
      <main className="flex w-full bg-amber-50 text-black min-h-screen">
        <EmployeeNav />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </>
  )
}