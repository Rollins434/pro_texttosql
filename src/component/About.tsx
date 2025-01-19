import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          About Us
        </h1>
        <p className="text-lg text-gray-700 leading-7">
          Welcome to <strong>APIcalypse</strong>, where we leverage the power
          of FastAPI and GenAI to deliver seamless data querying solutions. Our
          platform takes user queries, translates them into SQL, and retrieves
          meaningful results from complex database schemas.
        </p>
        <p className="text-lg text-gray-700 leading-7">
          Our mission is to make data access simple and intuitive for
          everyone—whether you're a developer, a data scientist, or a business
          analyst. With cutting-edge technology and a user-first approach, we
          ensure that you can focus on insights, not queries.
        </p>
      </div>
    </div>
  );
};

export default About;
