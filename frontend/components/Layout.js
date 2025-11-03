export default function Layout({ children }) {
  return (
    <div className="container">
      <header>
        <h1>MyCRUD — Users</h1>
        <hr />
      </header>
      <main>{children}</main>
    </div>
  );
}

