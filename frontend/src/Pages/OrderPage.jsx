import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { userContext } from "../context/userContext";

const updateOrderStatus = async (sessionId, status, userToken) => {
  try {
    const response = await fetch(
      "https://auth-payment.onrender.com/api/orders/update-order-status",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ sessionId, status }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Order status updated:", result);
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};

const OrderPage = () => {
  const { currentUser } = useContext(userContext);
  const { sessionId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser && currentUser.token) {
      updateOrderStatus(sessionId, "completed", currentUser.token)
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error updating order status:", error);
          setLoading(false);
        });
      removeItemsFromCart();
    }
  }, [sessionId, currentUser]);

  const removeItemsFromCart = async () => {
    try {
      await fetch("https://auth-payment.onrender.com/api/cart/removeAll", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Order Status</h2>
          <p className="text-gray-700">Updating your order status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Order Status :</h2>
        <p className="text-green-500">Your payment was successful!</p>
        <p className="text-gray-700">Order ID: {sessionId}</p>
        <p className="mt-4">
          Thank you for your purchase. Your order is now completed and being
          processed.
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

export default OrderPage;
