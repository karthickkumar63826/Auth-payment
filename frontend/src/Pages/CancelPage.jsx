import React from "react";
import { useParams, Link } from "react-router-dom";

const CancelPage = () => {
  const { sessionId } = useParams();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Order Status</h2>
        <p className="text-red-500">Your payment was cancelled.</p>
        <p className="text-gray-700">Order ID: {sessionId}</p>
        <p className="mt-4">
          It seems like your payment was not successful. Please try again.
        </p>
        <Link to="/">
          <p className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Back to Home
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
