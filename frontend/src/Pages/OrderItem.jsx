import React from "react";

const OrderItem = ({ order }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-bold mb-2">Order ID: {order._id}</h2>
      <ul>
        {order.products.map((product) => (
          <li
            key={product._id}
            className="flex justify-between items-center mb-2"
          >
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <span className="ml-2">{product.title}</span>
            </div>
            <span>${(product.price * product.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2">Status: {order.status}</p>
    </div>
  );
};

export default OrderItem;
