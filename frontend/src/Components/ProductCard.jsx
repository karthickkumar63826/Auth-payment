import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleAddToCart = async ({ product }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
    } else {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/cart/add`,
          {
            productId: product.id,
            title: product.title,
            quantity: 1,
            image: product.images && product.images[0],
            price: product.price,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        console.log("Product add to the cart", response.data);
      } catch (error) {
        console.log(`Error in adding a product on cart ${error.message}`);
      }
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {product.images && product.images[0] && (
        <img
          className="w-full h-64 object-cover"
          src={product.images[0]}
          alt={product.title}
        />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <p className="text-gray-700 text-base">${product.price}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600"
          onClick={() => handleAddToCart({ product })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
