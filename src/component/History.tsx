import React from "react";
import { useAppSelector } from "../store/hook";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaClipboard } from "react-icons/fa";

const History: React.FC = () => {
  const { queries } = useAppSelector((state) => state.queries);
  console.log("queries", queries);

  const downloadCSV = (tableData: any, filename = "table_data.csv") => {
    if (!Array.isArray(tableData) || tableData.length === 0) {
      alert("No table data available to download.");
      return;
    }

    const keys = Object.keys(tableData[0]); // Get column headers
    const csvContent = [
      keys.join(","), // Add headers row
      ...tableData.map((row) => keys.map((key) => `"${row[key]}"`).join(",")), // Add data rows
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderTableFromString = (tableData: string | any) => {
    let formattedRows;

    if (typeof tableData === "string") {
      const rows = tableData
        .split("\n")
        .filter(
          (row) =>
            row.includes("│") &&
            !row.includes("╒") &&
            !row.includes("╘") &&
            !row.includes("╞") &&
            !row.includes("├") &&
            !row.includes("╧")
        );

      formattedRows = rows?.map((row) =>
        row
          .split("│")
          .slice(1, -1)
          .map((cell) => cell.trim())
      );
    } else if (typeof tableData === "object" && tableData.length > 0) {
      const keys = Object.keys(tableData[0]);
      formattedRows = [
        keys,
        ...tableData.map((item: any) => keys.map((key) => item[key])),
      ];
    } else {
      return <p>No data available</p>;
    }

    return (
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            {formattedRows[0]?.map((header: any, index: any) => (
              <th key={index} className="border border-gray-300 p-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {formattedRows?.slice(1)?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell: any, cellIndex: any) => (
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
    <div className="flex justify-center px-4 py-8  min-h-screen">
      <div className="w-full max-w-6xl   rounded-lg p-6">
        <span className="block text-3xl font-bold  text-center text-transparent bg-clip-text bg-gradient-to-r  from-black via-pink-600 to-red-600 mb-6 font-poppins leading-tight">
          Query History
        </span>
        {queries.length > 0 ? (
          queries
            .filter((query) => query !== null) // Remove null values from the array
            .map((query, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-lg shadow-md mb-6"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    User Query
                  </h2>
                  <pre className="w-full p-4 bg-gray-900 text-green-300 font-mono border border-gray-700 rounded-md overflow-x-auto">
                    {query?.user_query || "No query provided yet"}
                  </pre>

                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Generated SQL Query
                  </h2>
                  <div className="relative">
                    <pre className="w-full p-4 bg-gray-900 text-green-300 font-mono border border-gray-700 rounded-md overflow-x-auto">
                      {query?.query || "No query generated yet"}
                    </pre>
                    <CopyToClipboard text={query?.query || ""}>
                      <button
                        className="absolute top-0 right-0 mt-2 mr-4 p-2 bg-[#5b60676e] text-white rounded-md hover:bg-gray-700"
                        title="Copy to clipboard"
                      >
                        <FaClipboard />
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Response
                  </h2>
                  <pre className="w-full p-4 bg-gray-900 text-green-300 font-mono border border-gray-700 rounded-md overflow-x-auto">
                    {query?.text_response || "Results will be displayed here"}
                  </pre>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Table Response
                  </h2>
                  {query.status !== false && query?.table_response ? (
                    <div>
                      {renderTableFromString(query?.table_response)}
                      <button
                        onClick={() => downloadCSV(query?.table_response)}
                        className="mt-4 px-4 py-2 bg-transparent text-gray-600 border-2 border-black rounded-md hover:border-slate-600 hover:text-black transition"
                      >
                        Download CSV
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-600">No table data available</p>
                  )}
                </div>
              </div>
            ))
        ) : (
          <p className="text-gray-600 text-center">No queries found.</p>
        )}
      </div>
    </div>
  );
};

export default History;
