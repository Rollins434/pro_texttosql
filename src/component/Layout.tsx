import React, { useState } from "react";
import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";

import { useAppSelector } from "../store/hook";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import {
  FaHome,
  FaDatabase,
  FaInfoCircle,
  FaAngleRight,
  FaAngleLeft,
  FaAddressBook,
  FaHistory,
} from "react-icons/fa";
import { SiClarifai } from "react-icons/si";

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
        } bg-gray-100 border-r border-gray-200 shadow-sm transition-all duration-100 ease-in-out relative`}
      >
        <div className="p-4 flex flex-col h-full">
          <nav className="mt-12 flex-1">
            <ul className="space-y-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex pl-4 py-2 rounded-md transition ${
                      isActive
                        ? "bg-red-500 text-white"
                        : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                    }`
                  }
                >
                  {isSidebarCollapsed ? (
                    <FaHome className="text-xl" />
                  ) : (
                    <div className="flex items-center">
                      <FaHome className="text-xl" />
                      <p className="pl-2">Home</p>
                    </div>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/agent"
                  className={({ isActive }) =>
                    `flex pl-4 py-2 rounded-md transition ${
                      isActive
                        ? "bg-red-500 text-white"
                        : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                    }`
                  }
                >
                  {isSidebarCollapsed ? (
                    <SiClarifai className="text-xl" />
                  ) : (
                    <div className="flex items-center">
                      <SiClarifai className="text-xl" />
                      <p className="pl-2">Agent</p>
                    </div>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/schema"
                  className={({ isActive }) =>
                    `flex pl-4 py-2 rounded-md transition ${
                      isActive
                        ? "bg-red-500 text-white"
                        : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                    }`
                  }
                >
                  {isSidebarCollapsed ? (
                    <FaDatabase className="text-xl" />
                  ) : (
                    <div className="flex items-center">
                      <FaDatabase className="text-xl" />
                      <p className="pl-2">Schema</p>
                    </div>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    `flex pl-4 py-2 rounded-md transition ${
                      isActive
                        ? "bg-red-500 text-white"
                        : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                    }`
                  }
                >
                  {isSidebarCollapsed ? (
                    <FaHistory className="text-xl" />
                  ) : (
                    <div className="flex items-center">
                      <FaHistory className="text-xl" />
                      <p className="pl-2">History</p>
                    </div>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-us"
                  className={({ isActive }) =>
                    `flex pl-4 py-2 rounded-md transition ${
                      isActive
                        ? "bg-red-500 text-white"
                        : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                    }`
                  }
                >
                  {isSidebarCollapsed ? (
                    <FaInfoCircle className="text-xl" />
                  ) : (
                    <div className="flex items-center">
                      <FaInfoCircle className="text-xl" />
                      <p className="pl-2">About</p>
                    </div>
                  )}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-4 -right-3 w-8 h-8 bg-gray-200 rounded-full shadow-md flex items-center justify-center transition-all duration-300`}
        >
          {isSidebarCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-transparent shadow-sm flex justify-between items-center p-4">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black via-pink-600 to-red-600">
            ApiCalypse SQLAI
          </h1>

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
