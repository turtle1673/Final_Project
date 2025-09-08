"use client"

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/title-test/test-login");
  }

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 p-2 rounded-2xl text-white"
    >
      Sign Out
    </button>
  );
}