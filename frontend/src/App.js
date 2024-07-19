// src/App.js
import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import SignupForm from "./Pages/SignupForm";
import LoginForm from "./Pages/LoginForm";
import { Routes, Route } from "react-router-dom";
import ProductShowcase from "./Pages/ProductShowCase";
import LogoutPage from "./Pages/LogoutPage";
import CartPage from "./Pages/CartPage";
import OrderPage from "./Pages/OrderPage";
import CancelPage from "./Pages/CancelPage";
import MyOrder from "./Pages/MyOrder";
import ProductPage from "./Pages/ProductPage";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductShowcase />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success/:sessionId" element={<OrderPage />} />
        <Route path="/cancel/:sessionId" element={<CancelPage />} />
        <Route path="/myorders" element={<MyOrder />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
