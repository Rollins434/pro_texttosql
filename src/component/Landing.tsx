import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hook"; // assuming you have a selector for auth state

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated); // assuming this checks if the user is logged in

    console.log("IsAuthenticated:", isAuthenticated); // Add log to verify if authentication status is correct

    const handleGetStarted = () => {
        console.log("Navigating..."); // Log before navigation
        if (!isAuthenticated) {
            navigate("/login", { replace: true }); // Redirect to login if not authenticated
        } else {
            navigate("/home"); // Redirect to home if authenticated
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="max-w-5xl w-full bg-white shadow-md rounded-lg p-6 space-y-6 text-center">
                <h1 className="text-4xl font-extrabold text-gray-500">
                    Welcome to
                    <span className="text-transparent bg-clip-text mx-2 bg-gradient-to-r from-cyan-500 to-orange-400">
                         ApiCalypse Text2Sql
                    </span>
                </h1>

                <p className="text-lg text-gray-700">
                    Experience seamless data queries with natural language processing and tables.
                </p>

                <button
                    className="py-3 px-6 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    onClick={handleGetStarted}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
