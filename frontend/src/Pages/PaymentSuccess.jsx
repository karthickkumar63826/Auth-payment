import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your purchase.
        </p>
        <button
          onClick={handleContinueShopping}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
