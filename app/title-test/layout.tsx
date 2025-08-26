import TitleTestNav from "@/components/TitleTestNav";

export default function TitleTestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div className="min-h-screen bg-amber-50 p-4">
        <TitleTestNav />
      {children}
    </div>
  );
}