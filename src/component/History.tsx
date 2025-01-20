import React from "react";
import { useAppSelector } from "../store/hook";
import { CodeBlock, dracula } from "react-code-blocks";
import { CopyToClipboard } from "react-copy-to-clipboard"; // Import the CopyToClipboard component
import { FaClipboard } from "react-icons/fa"; // Import the icon from react-icons

const History: React.FC = () => {
  const { queries } = useAppSelector((state) => state.queries);

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

    const formattedRows = rows?.map((row) =>
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
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Query History</h1>
      {queries.length > 0 ? (
        queries.map((query, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md mb-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                User Query
              </h2>
              <div>
                <CodeBlock
                  text={query?.user_query || "No query provided yet"}
                  language="sql"
                  showLineNumbers={false}
                  theme={dracula}
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Generated SQL Query
              </h2>
              <div className="relative ">
                <CodeBlock
                  text={query?.query || "No query generated yet"}
                  language="sql"
                  showLineNumbers={false}
                  theme={dracula}
                />
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
              <pre className="w-full p-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-md overflow-y-auto whitespace-pre-wrap">
                {query?.response || "Results will be displayed here"}
              </pre>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Table Response
              </h2>
              {query?.table_response ? (
                renderTableFromString(query?.table_response)
              ) : (
                <p className="text-gray-600">No table data available</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No queries found.</p>
      )}
    </div>
  );
};

export default History;
