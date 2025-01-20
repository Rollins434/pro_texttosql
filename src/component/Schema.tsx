import React, { useState } from "react";

const Schema: React.FC = () => {
  const [selectedSchema, setSelectedSchema] = useState("supply-chain");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-full w-full p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-900 font-inter">
          Schema Diagram
        </h1>

        {/* Radio Button Selection */}
        <div className="flex justify-center space-x-6">
          <label className="flex items-center space-x-2 text-gray-800">
            <input
              type="radio"
              value="supply-chain"
              checked={selectedSchema === "supply-chain"}
              onChange={() => setSelectedSchema("supply-chain")}
              className="accent-red-500"
            />
            <span>Supply Chain</span>
          </label>

          <label className="flex items-center space-x-2 text-gray-800">
            <input
              type="radio"
              value="banking"
              checked={selectedSchema === "banking"}
              onChange={() => setSelectedSchema("banking")}
              className="accent-red-500"
            />
            <span>Banking</span>
          </label>
        </div>

        {/* Conditionally Rendered Iframe */}
        <iframe
          width="100%"
          height="600px"
          style={{
            boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
          }}
          allowTransparency={true}
          allowFullScreen={true}
          scrolling="no"
          title="Embedded DrawSQL IFrame"
          frameBorder="0"
          src={
            selectedSchema === "supply-chain"
              ? "https://drawsql.app/teams/apicaly/diagrams/supply-chain/embed"
              : "https://drawsql.app/teams/apicaly/diagrams/banking/embed"
          }
        />
      </div>
    </div>
  );
};

export default Schema;
