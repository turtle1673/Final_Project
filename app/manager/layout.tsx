import ManagerNav from "@/components/ManagerNav";

export default function LayoutManager({ children } : {children : React.ReactNode}) {
  return (
    <>
      <main className="flex w-full min-h-screen bg-amber-50 text-black">
        <ManagerNav />
        <div className="container flex flex-col items-center">
        {children}
        </div>
        </main>
    </>
  )
}