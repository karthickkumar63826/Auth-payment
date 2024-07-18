import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import OrderItem from "./OrderItem";

const MyOrder = () => {
  const { currentUser } = useContext(userContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://auth-payment.onrender.com/api/orders",
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [currentUser.token]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
