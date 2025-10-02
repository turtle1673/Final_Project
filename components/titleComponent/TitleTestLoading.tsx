export default function LoadingPage() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center mt-48">
      <div className="h-12 w-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="animate-pulse text-3xl">loading</p>
    </div>
  )
}