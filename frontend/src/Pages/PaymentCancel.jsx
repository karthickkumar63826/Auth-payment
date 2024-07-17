import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    navigate("/cart");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Failed!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          There was an issue with your payment.
        </p>
        <button
          onClick={handleRetryPayment}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
