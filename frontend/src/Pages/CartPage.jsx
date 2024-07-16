import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cart`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.data;
        const items = await data.items;
        const priceTotal = await data.total;
        setCart(items);
        setTotal(priceTotal);
        console.log(items);
      } catch (error) {
        console.log("Error in fetching cart item", error.message);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemove = async (productId) => {
    console.log(productId);
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/cart/remove",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          data: {
            productId: productId,
          },
        }
      );

      const data = await response.data;
      const items = await data.items;
      const totalPrice = await data.total;
      setCart(items);
      setTotal(totalPrice);
    } catch (error) {
      console.log("Error while removing an item", error.message);
    }
  };

  return (
    <div className="container mx-auto py-12 ">
      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>
      <div className="px-20">
        <div className="bg-white rounded shadow-md">
          {cart.map((product) => (
            <div
              className="flex items-center border-b border-gray-200 py-4"
              key={product.productId}
            >
              <div className="flex-shrink-0 w-20">
                <img
                  src={product.image}
                  alt="Product"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex-grow ml-4">
                <p className="text-lg font-semibold">{product.title}</p>
                <p className="text-gray-700">
                  $ {product.price} x {product.quantity}
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemove(product.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-8">
        <p className="text-xl font-semibold mb-4">
          Total:{total ? ` $${total}` : " $0"}
        </p>
        <button className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
