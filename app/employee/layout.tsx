import EmployeeNav from "@/components/EmployeeNav";

export default function LayoutEmployee({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex w-full bg-amber-300 text-black min-h-full">
        <EmployeeNav />
        <div className="flex w-full flex-col items-center bg-amber-50 h-screen">
          {children}
        </div>
      </main>
    </>
  )
}