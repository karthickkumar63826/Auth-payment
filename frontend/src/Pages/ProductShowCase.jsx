import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { userContext } from "../context/userContext";
import { useContext } from "react";

function ProductShowcase() {
  const [products, setProducts] = useState([]);

  const { currentUser } = useContext(userContext);

  useEffect(() => {
    fetchItems();
  }, [currentUser]);

  const fetchItems = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 ">
        <h2 className="text-2xl font-extrabold text-gray-900">
          Featured Products
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductShowcase;
