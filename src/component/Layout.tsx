// component/Layout.tsx
import React from "react";
import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hook";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";

const Layout: React.FC = () => {
  const userrole = useAppSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get navigate function

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r border-gray-200 shadow-sm">
        <div className="p-6">
          <nav className="mt-6">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition"
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
        <header className="bg-transparent shadow-sm  flex justify-between items-center p-4">
          <h1 className="text-lg font-semibold text-gray-800">SQL Generator</h1>
          <div className="flex items-center space-x-4">
            {userrole && <span className="text-gray-700">{userrole}</span>}
            {userrole ? (
              <button
                onClick={handleLogout} // Call handleLogout on button click
                className="text-gray-700 hover:bg-gray-200 rounded-md px-3 py-1 transition"
              >
                Logout
              </button>
            ) : (
              <NavLink to={"/login"}>Login</NavLink>
            )}
          </div>
        </header>

        {/* Outlet for Nested Routes */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
