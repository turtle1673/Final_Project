import Link from 'next/link'
import { useSession } from 'next-auth/react'
import SignOutButton from './SignOutButton'

export default function TitleTestNavRole() {
    const {data:session,status} = useSession()
  if(status === "loading") return <>loading...</>
  return (
    <>
    {session ? (<div className="flex gap-8 items-center">
          <div className="flex flex-col gap-2 text-end">
            <p className="text-2xl text-amber-300 font-bold tracking-widest">{session.user.name}</p>
            <p className="text-md text-green-300">{session.user.role}</p>
          </div>
          <SignOutButton/>
          </div>) : <Link className="text-2xl hover:underline" href="/title-test/login">สำหรับพนักงาน</Link>}
  </>
  )
}
