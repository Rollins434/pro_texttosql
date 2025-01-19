import React from "react";

const Schema: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-full w-full   p-6 space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Schema Diagram
        </h1>
        <iframe
          width="100%"
          height="600px"
          style={{
            boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
            // borderRadius: "15px",
          }}
          allowTransparency={true}
          allowFullScreen={true}
          scrolling="no"
          title="Embedded DrawSQL IFrame"
          frameBorder="0"
          src="https://drawsql.app/teams/apicaly/diagrams/supply-chain/embed"
        />
      </div>
    </div>
  );
};

export default Schema;
