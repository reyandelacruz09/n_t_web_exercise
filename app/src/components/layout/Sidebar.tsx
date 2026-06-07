import { Link, useLocation } from "react-router-dom";
import React from "react";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Orders", path: "/orders" },
  { name: "Products", path: "/products" },
  { name: "Customers", path: "/customers" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r bg-card min-h-screen">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">OMS</h2>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block rounded-lg px-4 py-2 transition ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}