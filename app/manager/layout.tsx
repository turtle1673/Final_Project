import ManagerNav from "@/components/ManagerNav";

export default function LayoutManager({ children } : {children : React.ReactNode}) {
  return (
    <>
      <main className="flex w-full min-h-screen bg-white text-black">
        <ManagerNav />
        <div className="container flex flex-col items-center">
        {children}
        </div>
        </main>
    </>
  )
}