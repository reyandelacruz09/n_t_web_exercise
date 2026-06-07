export default function Navbar() {
    return (
      <div className="h-16 border-b px-6 flex items-center justify-between">
        <h1 className="font-semibold">
          Order Management System
        </h1>

        <button
          className="border px-3 py-1 rounded"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    );
  }