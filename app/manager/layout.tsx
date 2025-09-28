export default function LayoutManager({ children } : {children : React.ReactNode}) {
  return (
    <>
      <main className="flex flex-col w-full items-center bg-amber-50 text-black min-h-full ">{children}</main>
    </>
  )
}