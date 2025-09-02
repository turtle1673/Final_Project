export default function TitleTestNav() {
  return (
    <nav className="mb-4 flex gap-4">
      <a href="/title-test/test-page" className="text-blue-500 underline">
        Test Page
      </a>
      <a href="/title-test/test-createuser" className="text-blue-500 underline">
        Create User
      </a>
      <a className="text-blue-500 underline" href="/title-test/test-login">
        Login
      </a>
      <a className="text-blue-500 underline" href="/title-test/test-drinks">
        Drinks
      </a>
    </nav>
  )
}
