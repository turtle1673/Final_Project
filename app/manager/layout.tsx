import ManagerNav from "@/components/titleComponent/ManagerNav";

export default function LayoutManager({ children } : {children : React.ReactNode}) {
  return (
    <>
      <main className="flex w-full bg-amber-50 text-black min-h-full ">
        <ManagerNav />
        <div className="container flex flex-col items-center">
        {children}
        </div>
        </main>
    </>
  )
}