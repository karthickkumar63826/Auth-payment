import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NTHcaSFMQKvNeSDaJtpZRkj5G6kTGSgEOJHcgiL6SVgqG39nY0u5rsDffPmP7QmYxcHR1bcAwBg4nILgjZDYgfz00CYcQTLCp"
);

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = location.state;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const createCheckoutSession = async () => {
      try {
        const response = await axios.post(
          "https://auth-payment.onrender.com/api/cart/create-checkout-session",
          { items: cartItems },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!response.data.ok) {
          throw new Error("Failed to create checkout session");
        }

        setClientSecret(response.data.session.client_secret);
      } catch (error) {
        console.error("Error creating checkout session:", error);
      }
    };

    createCheckoutSession();
  }, [cartItems, user.token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {},
        },
      });

      if (result.error) {
        console.error(result.error.message);
      } else {
        console.log("Payment succeeded:", result.paymentIntent);
        navigate("/success"); // Redirect to a success page
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!clientSecret}>
          Pay
        </button>
      </form>
    </Elements>
  );
};

export default CheckoutForm;
