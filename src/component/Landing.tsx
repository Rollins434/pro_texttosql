import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hook";
import texttosql from "../assets/texttosql.png";
// import texttosql from "../assets/texttosql2.webp";
import textsqlgif from "../assets/textsqlgif.gif";

const LandingPage: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-6">
      {/* Header Section */}
      <header className="w-full max-w-5xl text-center mt-12">
        <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
          Revolutionize Your Queries with
          {/* <span className="block text-cyan-500"> */}
          <span className="block font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-black via-pink-600 to-red-600">
            ApiCalypse Text2SQL
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Effortlessly transform natural language into powerful SQL queries.
        </p>
      </header>

      {/* Image Section */}
      <div className="w-full max-w-4xl mt-4 flex justify-center px-4">
        <img
          src={textsqlgif}
          alt="Text-to-SQL Process"
          className="w-full h-80 object-contain"
        />
      </div>

      {/* Get Started Button */}
      <div className="mt-2">
        {isAuthenticated ? (
          <Link
            to="/agent"
            className="px-8 py-4 text-lg font-medium text-red-500 border border-red-500 rounded-md bg-transparent hover:bg-red-500 hover:text-white transition"
          >
            Get Started
          </Link>
        ) : (
          <Link
            to="/login"
            className="px-8 py-4 text-lg font-medium text-red-500 border border-red-500 rounded-md bg-transparent hover:bg-red-500 hover:text-white transition"
          >
            Get Started
          </Link>
        )}
      </div>

      {/* Footer Section */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        © 2025 ApiCalypse. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
