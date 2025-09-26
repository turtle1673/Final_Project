"use client";

export default function TitleTestDeleteUser({ userId }: { userId: string }) {
     const handleDelete = async () => {
      if (!confirm("Are you sure you want to delete this user?")) return
        
    }

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
      delete
    </button>
  )
}
