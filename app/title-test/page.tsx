
export default function page() {
  return (
      <>
        <h1 className="text-black font-bold font-3xl text-center">Title Test Page</h1>
        <div className="flex flex-col items-center justify-self-center bg-orange-300 rounded-2xl w-fit gap-4 p-4 mt-6">
        <a href="/title-test/test-page">Test page</a>
        <a href="/title-test/test-login">Test login</a>
        <a href="/title-test/test-createuser">Test create user</a>
        </div>
    </>
  )
}
