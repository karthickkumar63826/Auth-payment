import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ cartItems, onPaymentSuccess }) => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
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
        onPaymentSuccess(result.paymentIntent);
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!clientSecret}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
