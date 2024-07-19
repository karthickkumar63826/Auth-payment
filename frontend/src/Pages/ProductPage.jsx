import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import { useContext } from "react";
import StarRating from "../Components/StarRating";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const { setCartLength } = useContext(userContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          ` https://dummyjson.com/products/${productId}`
        );

        console.log(response);
        const data = await response.data;

        setProduct(data);
      } catch (error) {
        console.log(error.emssage);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
    } else {
      try {
        const response = await axios.post(
          `https://auth-payment.onrender.com/api/cart/add`,
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

        const data = response.data;
        setCartLength((prevLength) => prevLength + 1);

        console.log("Product added to the cart", data);
      } catch (error) {
        console.log(`Error in adding a product to the cart: ${error.message}`);
      }
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row bg-white shadow-md overflow-hidden md:max-w-6xl">
        <div className="w-full md:w-1/2 md:flex-shrink-0">
          <img
            className="h-78 w-full object-cover md:h-full"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <div className="uppercase tracking-wide text-2xl text-indigo-500 font-semibold">
            {product.category}
          </div>
          <h1 className="block mt-1 text-4xl leading-tight font-medium text-black">
            {product.title}
          </h1>
          <p className="mt-2 text-xl text-gray-500">{product.description}</p>
          <div className="mt-4 text-xl font-medium">
            Price: ${product.price}
          </div>
          <div className="mt-2 text-xl font-medium">
            Rating
            <StarRating rating={product.rating} />
          </div>
          <button
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ProductPage;
