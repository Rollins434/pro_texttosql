import React from "react";
import { useAppSelector } from "../store/hook";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaClipboard } from "react-icons/fa";

const History: React.FC = () => {
  const { queries } = useAppSelector((state) => state.queries);

  const downloadCSV = (tableString: string, filename = "table_data.csv") => {
    const rows = tableString
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

    if (rows.length === 0) {
      alert("No table data available to download.");
      return;
    }

    const formattedRows = rows.map((row) =>
      row
        .split("│")
        .slice(1, -1)
        .map((cell) => cell.trim())
    );

    let csvContent = formattedRows
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderTableFromString = (tableString: string) => {
    const rows = tableString
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

    if (rows.length === 0) {
      return <p className="text-gray-600">No table data available.</p>;
    }

    const formattedRows = rows.map((row) =>
      row
        .split("│")
        .slice(1, -1)
        .map((cell) => cell.trim())
    );

    // Check if the entire table consists of "null" values
    const allNull = formattedRows.every((row) =>
      row.every((cell) => cell.toLowerCase() === "null")
    );

    if (allNull) {
      return (
        <p className="text-gray-600">
          No meaningful data available in the table.
        </p>
      );
    }

    return (
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            {formattedRows[0]?.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {formattedRows?.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-300 p-2 text-sm text-gray-700"
                >
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
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Query History
        </h1>
        {queries.length > 0 ? (
          queries.map((query, index) => (
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
                  {query?.response || "Results will be displayed here"}
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
                    className="mt-4 px-4 py-2 bg-transparent text-gray-400-600 border-2 border-black-600 rounded-md hover:border-slate-600 hover:text-black transition"
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
