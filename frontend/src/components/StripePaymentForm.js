import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const StripePaymentForm = ({ orderId, successpaymenthandler }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { token } = await stripe.createToken(cardElement);

      if (token) {
        // Send the token to your server to handle the payment
        // You can also send additional information along with the token
        const paymentResult = {
          paymentMethod: 'stripe', // Indicate the payment method
          token: token,
        };

        // Call the success payment handler with the payment result
        successpaymenthandler(paymentResult);
      } else {
        // Handle token creation failure
        setError('Failed to create payment token.');
      }
    } catch (error) {
      // Handle other types of errors
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ padding: '20px' }}>
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={!stripe}>
        Pay with Card
      </button>
    </form>
  );
};

export default StripePaymentForm;
