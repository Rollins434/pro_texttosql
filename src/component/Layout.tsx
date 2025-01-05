import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6">
          <nav className="mt-6">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            {/* <h1 className="text-2xl font-bold text-gray-800">
              SQL Generator
            </h1> */}
          </div>
        </header>

        {/* Outlet for Nested Routes */}
        <main className="flex-1  bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
