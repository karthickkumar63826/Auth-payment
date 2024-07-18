import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../context/userContext";
import { loadStripe } from "@stripe/stripe-js";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const { setCartLength } = useContext(userContext);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `https://auth-payment.onrender.com/api/cart`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = response.data;
        const items = data.items;
        const priceTotal = data.total;
        console.log(items);
        setCart(items);
        setTotal(priceTotal);
        setCartLength(items.length);
      } catch (error) {
        console.log("Error in fetching cart items", error.message);
      }
    };

    fetchCartItems();
  }, [setCartLength, user.token]);

  const handleRemove = async (productId) => {
    try {
      const response = await axios.delete(
        "https://auth-payment.onrender.com/api/cart/remove",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          data: {
            productId: productId,
          },
        }
      );

      const data = response.data;
      const items = data.items;
      const totalPrice = data.total;
      setCart(items);
      setTotal(totalPrice);
      setCartLength(items.length);
    } catch (error) {
      console.log("Error while removing an item", error.message);
    }
  };

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51NTHcaSFMQKvNeSDaJtpZRkj5G6kTGSgEOJHcgiL6SVgqG39nY0u5rsDffPmP7QmYxcHR1bcAwBg4nILgjZDYgfz00CYcQTLCp"
      );

      const body = {
        products: cart,
      };

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      };

      const response = await fetch(
        "https://auth-payment.onrender.com/api/product/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>
      <div className="px-20">
        <div className="bg-white rounded shadow-md">
          {cart &&
            cart.map((product) => (
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
          Total: {total ? ` $${total}` : " $0"}
        </p>
        <button
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
          onClick={makePayment}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
