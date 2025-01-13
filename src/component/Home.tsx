import React, { useState } from "react";
import { useAppSelector } from "../store/hook";

interface ApiResponse {
    response: string;
    table_response: string;
    query: string;
    status: boolean;
}

const Home: React.FC = () => {
    const userrole = useAppSelector((state) => state.auth.role);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuery(e.target.value);
    };

    const handleFetchResults = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/getData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ question: query, role: "Admin", model: "Gemini" }),
            });

            if (!response.ok) {
                throw new Error("Error fetching results");
            }

            const data: ApiResponse = await response.json();
            console.log("data", data);
            setResult(data);
        } catch (error: any) {
            setResult({ response: `Error: ${error.message}`, table_response: "", query: "", status: false });
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setQuery("");
        setResult(null);
    };

    // Function to convert table_response string into a proper HTML table
    const renderTableFromString = (tableString: string) => {
        const rows = tableString
            .split("\n")
            .filter(row => row.includes("│") && !row.includes("╒") && !row.includes("╘") && !row.includes("╞") && !row.includes("├") && !row.includes("╧"));

        const formattedRows = rows.map(row =>
            row.split("│").slice(1, -1).map(cell => cell.trim())
        );

        return (
            <table className="w-full border-collapse border border-gray-300 mt-4">
                <thead>
                    <tr className="bg-gray-200">
                        {formattedRows[0].map((header, index) => (
                            <th key={index} className="border border-gray-300 p-2 text-left">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {formattedRows.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-300 p-2">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6 space-y-6">
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

                {/* Button Section */}
                <div className="flex space-x-4">
                    <button
                        className="flex-1 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        onClick={handleFetchResults}
                    >
                        Generate Response
                    </button>
                    <button
                        className="flex-1 py-3 font-semibold text-white rounded-lg bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                </div>

                {/* Results Display */}
                {loading ? (
                    <Loader />
                ) : result && (
                    <>
                       {/* SQL Query Section */}
                       <div>
                            <h2 className="text-lg font-medium text-gray-900 mb-2">Generated SQL Query</h2>
                            <pre className="w-full max-h-64 p-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-md overflow-y-auto whitespace-pre-wrap">
                                {result.query || "No query generated yet"}
                            </pre>
                        </div>
                        
                        {/* Natural Language Response */}
                        <div>
                            <h2 className="text-lg font-medium text-gray-900 mb-2">Response</h2>
                            <pre className="w-full max-h-64 p-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-md overflow-y-auto whitespace-pre-wrap">
                                {result.response || "Results will be displayed here"}
                            </pre>
                        </div>

                     

                        {/* Table Response Section */}
                        <div>
                            <h2 className="text-lg font-medium text-gray-900 mb-2">Table Response</h2>
                            {result.table_response
                                ? renderTableFromString(result.table_response)
                                : <p>No table data available</p>
                            }
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;

// Loader Component
function Loader() {
    return (
      <div role="status" className="w-full animate-pulse">
      <div className="h-2.5 bg-blue-200 rounded-full w-full mb-4"></div>
      <div className="h-2 bg-blue-400 rounded-full w-72 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full w-60 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5"></div>
      <div className="h-2 bg-blue-200  rounded-full w-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full w-full"></div>
      <span className="sr-only">Loading...</span>
  </div>
        // <div role="status" className="max-w-sm animate-pulse">
        //     <div className="h-2.5 bg-gray-200 rounded-full w-70 mb-4"></div>
        //     <div className="h-2 bg-gray-400 rounded-full max-w-[560px] mb-2.5"></div>
        //     <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        //     <div className="h-2 bg-gray-200 rounded-full max-w-[450px] mb-2.5"></div>
        //     <div className="h-2 bg-gray-200 rounded-full max-w-[400px] mb-2.5"></div>
        //     <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
        //     <span className="sr-only">Loading...</span>
        // </div>
    );
}
