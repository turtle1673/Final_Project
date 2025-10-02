"use server"
import Link from "next/link";

export default async function ManagerNav() {

  return (
    <nav className="flex flex-col items-start gap-2 w-1/6 bg-white border-r border-teal-300 h-screen p-4 shadow-md">
      {/* Accounts */}
      <Link
        href="/manager/accounts-management"
        className="px-3 py-2 w-full font-semibold text-teal-700 hover:bg-blue-100 rounded-lg transition"
      >
        Accounts
      </Link>

      {/* Drinks */}
      <Link
        href="/manager/drinks-management"
        className="px-3 py-2 w-full font-semibold text-teal-700 hover:bg-blue-100 rounded-lg transition"
      >
        Drinks
      </Link>

      {/* Stocks */}
      <Link
        href="/manager/stocks-management"
        className="px-3 py-2 w-full font-semibold text-teal-700 hover:bg-blue-100 rounded-lg transition"
      >
        Stocks
      </Link>
    </nav>
  );
}
