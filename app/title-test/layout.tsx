import TitleTestNav from "@/components/TitleTestNav";

export default function TitleTestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div className="w-full h-full bg-amber-300 p-4">
        <TitleTestNav />
      {children}
    </div>
  )
}