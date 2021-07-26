import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { buyCourse } from '../actions/courses';
// import PaymentDetailPage from './PaymentDetailPage';

// export default function PaymentPage({ location }) {
//   const courseToPurchase = location.state?.course;
//   const [message, setMessage] = useState('');

//   const Message = ({ message }) => (
//     <section>
//       <p className='payment-p'>{message}</p>
//     </section>
//   );
//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);
//     if (query.get('success')) {
//       setMessage('Order placed! You will receive an email confirmation.');
//     }
//     if (query.get('canceled')) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);
//   return message ? (
//     <Message message={message} />
//   ) : (
//     <PaymentDetailPage courseToPurchase={courseToPurchase} />
//   );
// }

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const promise = loadStripe(
  'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3'
);
const PaymentPage = ({ location }) => {
  const courseToPurchase = location.state?.course;
  return (
    <div className='App'>
      <Elements stripe={promise}>
        <CheckoutForm courseToPurchase={courseToPurchase} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
