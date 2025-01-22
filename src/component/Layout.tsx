import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

import { useAppSelector } from "../store/hook";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import {
  FaHome,
  FaDatabase,
  FaInfoCircle,
  FaAngleRight,
  FaAngleLeft,
  FaHistory,
  FaChevronDown,
  FaChevronRight,
  FaHamburger,
  FaCross,
} from "react-icons/fa";
import { SiClarifai } from "react-icons/si";
import { FaCircleXmark, FaXmark } from "react-icons/fa6";

const Layout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSchemaOpen, setIsSchemaOpen] = useState(false);

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
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } bg-gray-100 border-r border-gray-200 shadow-sm transition-all duration-200 ease-in-out fixed h-full z-40`}
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

              {/* Accordion for Schema */}
              <li>
                <button
                  className="flex pl-4 py-2 rounded-md text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition w-full"
                  onClick={() => setIsSchemaOpen(!isSchemaOpen)}
                >
                  <FaDatabase className="text-xl" />
                  {!isSidebarCollapsed && (
                    <div className="flex justify-between w-full">
                      <p className="pl-2">Schema</p>
                      {isSchemaOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>
                  )}
                </button>
                {isSchemaOpen && !isSidebarCollapsed && (
                  <ul className="pl-8 space-y-2 mt-2">
                    <li>
                      <NavLink
                        to="/schema/banking"
                        className={({ isActive }) =>
                          `flex pl-4 py-2 rounded-md transition ${
                            isActive
                              ? "bg-red-500 text-white"
                              : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                          }`
                        }
                      >
                        Banking
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/schema/supply-chain"
                        className={({ isActive }) =>
                          `flex pl-4 py-2 rounded-md transition ${
                            isActive
                              ? "bg-red-500 text-white"
                              : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                          }`
                        }
                      >
                        Supply Chain
                      </NavLink>
                    </li>
                  </ul>
                )}
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
          className={`absolute top-4  right-5 w-8 h-8 bg-gray-200 rounded-full shadow-md flex items-center justify-center transition-all duration-300`}
        >
          {isSidebarCollapsed ? <FaHamburger /> : <FaCircleXmark />}
        </button>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Navbar */}
        <header className="bg-gray-200/30 backdrop-blur-lg shadow-sm flex justify-between items-center p-4 sticky top-0 z-50 border-b border-white/20">
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
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
