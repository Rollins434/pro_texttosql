import React, { useState } from "react";
import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hook";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { FaHome, FaDatabase, FaInfoCircle,FaAngleRight, FaAngleLeft } from "react-icons/fa"; // Example icons

const Layout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const userrole = useAppSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } bg-gray-100 border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out relative`}
      >
        <div className="p-4 flex flex-col h-full">
          <nav className="mt-12 flex-1">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="flex items-center pl-4 py-2 rounded-md text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition"
                >
                  
                  <FaHome className={`text-lg ${isSidebarCollapsed ? "text-xl" : "text-lg"}`} />
                  {!isSidebarCollapsed && <span className="ml-3">Home</span>}
                </Link>
              </li>
              <li>
                <Link
                  to="/schema"
                  className="flex items-center pl-4 py-2 rounded-md text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition"
                >
                  <FaDatabase className={`text-lg ${isSidebarCollapsed ? "text-xl" : "text-lg"}`} />
                  {!isSidebarCollapsed && <span className="ml-3">Schema</span>}
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="flex items-center pl-4 py-2 rounded-md text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition"
                >
                  <FaInfoCircle className={`text-lg ${isSidebarCollapsed ? "text-xl" : "text-lg"}`} />
                  {!isSidebarCollapsed && <span className="ml-3">About Us</span>}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-4 -right-3 w-8 h-8 bg-gray-200 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
            isSidebarCollapsed ? "translate-x-0" : ""
          }`}
        >
          {isSidebarCollapsed ? <FaAngleRight/> : <FaAngleLeft/>}
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-transparent shadow-sm flex justify-between items-center p-4">
          <h1 className="text-lg font-semibold text-gray-800">SQL Generator</h1>
          <div className="flex items-center space-x-4">
            {userrole && <span className="text-gray-700">{userrole}</span>}
            {userrole ? (
              <button
                onClick={handleLogout}
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
