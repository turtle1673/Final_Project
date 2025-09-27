"use client";
import TitleTestDeleteUserButton from "@/components/titleComponent/TitleTestDeleteUserButton";
import TitleTestLoading from "@/components/titleComponent/TitleTestLoading";
import TitleTestNotfound from "@/components/titleComponent/TitleTestNotfound";
import { Iuser } from "@/types/iuser";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [loading, setLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [user, setUser] = useState<Iuser | null>(null)

  const [name, setName] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/user/${id}`);
      const json = await res.json();

      if (res.status === 404) {
        return <TitleTestNotfound message={json.error} />
      }
      if (!res.ok) {
        throw new Error(json.error);
      }

      const user: Iuser = json.data
      setUser(user)
      setName(user.name)
      setRole(user.role)
      setEmail(user.email)
    } catch (err: any) {
      alert(err.message || "error fetching user");
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (id) {
      fetchUser()
    }
  }, [])
  if (loading) return <TitleTestLoading />
  if (!user) return <TitleTestNotfound message="User not found" />;
  const isSeedEmail = user.email === process.env.NEXT_PUBLIC_FIRST_MANAGER_EMAIL

  return (
    <>
      <div className="bg-white mt-16 w-5xl border border-teal-200 rounded-lg p-6 shadow-md">
        <h1 className=" text-2xl font-bold text-teal-700 mb-6 border-b border-teal-100 pb-2">
          Employee Detail
        </h1>

        <div className="flex justify-between gap-6">
          {/* Form */}
          <form className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              readOnly={!isEdit}
              className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none read-only:bg-gray-50"
            />

            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              disabled={!isEdit}
              className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none disabled:bg-gray-50"
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="MANAGER">Manager</option>
            </select>

            <input
              type="text"
              value={email}
              readOnly
              className="focus:outline-none w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-700"
            />
          </form>

          {/* Action buttons */}
          <div className="mt-2 flex flex-col gap-4 w-1/5 items-end">
            {isEdit ? (
              <button
                type="button"
                onClick={() => setIsEdit(false)}
                className="bg-teal-600 text-white w-full px-4 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium"
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className="bg-teal-500 text-white w-full px-4 py-2 rounded-md hover:bg-teal-600 transition-colors font-medium"
              >
                Edit
              </button>
            )}
            <button onClick={() => {
              router.push("./")
            }} className="bg-orange-500 text-white w-full px-4 py-2 rounded-md hover:bg-orange-600 transition-colors font-medium">
              cancel
            </button>
            {!isSeedEmail && (
              <TitleTestDeleteUserButton userId={user.id} />
            )}
          </div>
        </div>
      </div>

    </>
  )
}
