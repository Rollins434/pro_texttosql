import React, { useState } from "react";
import { useAppSelector } from "../store/hook";

const Home: React.FC = () => {
  const userrole = useAppSelector((state) => state.auth.role);
  const [query, setQuery] = useState("");
  const [database, setDatabase] = useState("school");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  const handleDatabaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDatabase(e.target.value);
  };

  const handleFetchResults = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("http://localhost:8080/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ question: query,role:"Admin",model:"Gemini" }),
      });

      if (!response.ok) {
        throw new Error("Error fetching results");
      }

      const data = await response.json();
      setResult(data.response);
    } catch (error:any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  // Define options based on user role
  // const getDatabaseOptions = () => {
  //   switch (userrole) {
  //     case "Admin":
  //       return (
  //         <>
  //           <option value="school">School</option>
  //           <option value="business">Business</option>
  //           <option value="hospital">Hospital</option>
  //         </>
  //       );
  //     case "User":
  //       return (
  //         <>
  //           <option value="school">School</option>
  //           <option value="hospital">Hospital</option>
  //         </>
  //       );
  //     default:
  //       return (
  //         <>
  //           <option value="school">School</option>
  //         </>
  //       );
  //   }
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Generate{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
            SQL
          </span>
        </h1>

        {/* Query Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What query would you like to generate?
          </label>
          <textarea
            className="w-full p-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
            rows={4}
            placeholder="e.g., Find all the users who have made most orders"
            value={query}
            onChange={handleQueryChange}
          />
        </div>

        {/* Database Dropdown */}
       {/*  <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select a database:
          </label>
          <select
            className="w-full p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            value={database}
            onChange={handleDatabaseChange}
          >
            {getDatabaseOptions()} 
          </select>
        </div> */}

        {/* Submit Button */}
        <button
          className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          onClick={handleFetchResults}
        >
          Generate SQL
        </button>

        {/* Results Display */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">SQL Output</h2>
          {
            loading ? <Loader/> : 
          <pre className="w-full p-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-md overflow-x-auto">
            {result || "Results will be displayed here"}
          </pre>
          }
        </div>
      </div>
    </div>
  );
};

export default Home;

function Loader() {
  return (
    <>
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
}
