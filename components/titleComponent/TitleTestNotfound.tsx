export default function TitleTestNotfound({message} : {message? : string}) {
  return (
    <>
    <div className="container text-gray-700 flex flex-col gap-8 justify-center items-center">
        <header className="uppercase font-extrabold text-9xl">404</header>
        <p className="uppercase font-bold text-3xl">not found</p>
        <div className="text-2xl">this page cannot be founded <span className="underline">{message}</span></div>
    </div>
    </>
  )
}
