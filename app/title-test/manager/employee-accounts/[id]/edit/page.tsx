"use server"

import TitleTestEditStaff from "@/components/titleTest/TitleTestEditStaff";

export default async function editAccount({params,}: {params: Promise<{ id: string }>}) {
  const { id } = await params;

  return (
    <>
      <TitleTestEditStaff id={id} />
    </>
  );
}
