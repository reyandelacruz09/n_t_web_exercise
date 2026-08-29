import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="h-16 border-b px-6 flex items-center justify-between">
      <h1 className="font-semibold">
        Order Management System
      </h1>

      <button
        className="border px-3 py-1 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
