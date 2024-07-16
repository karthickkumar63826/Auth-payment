import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="bg-gray-100  ">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 ">
        <h1 className="text-3xl font-extrabold text-gray-700 sm:text-5xl lg:text-5xl">
          Welcome to Our Store to Lookup Latest Products
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Discover the best products at unbeatable prices.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            to={"/products"}
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
