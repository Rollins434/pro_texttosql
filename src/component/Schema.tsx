import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Schema: React.FC = () => {
  const { database } = useParams();

  const databaseName = {
    "supply-chain": "Supply Chain",
    banking: "Banking",
  }[database ?? ""];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-full w-full p-6 space-y-6">
        <span className="block text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r  from-black via-pink-600 to-red-600 mb-6 font-poppins leading-tight">
          {`${databaseName} Schema Diagram`}
        </span>

        {/* Radio Button Selection */}

        {/* Conditionally Rendered Iframe */}
        <iframe
          width="100%"
          height="600px"
          style={{
            boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
          }}
          allowTransparency={true}
          allowFullScreen={true}
          title={`{database} SQL Diagram`}
          src={`https://drawsql.app/teams/apicaly/diagrams/${database}/embed`}
        />
      </div>
    </div>
  );
};

export default Schema;
