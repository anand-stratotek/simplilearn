import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { buyCourse } from '../actions/courses';

const PaymentDetailPage = ({ courseToPurchase }) => {
  const dispatch = useDispatch();

  const onPaymentButtonClick = (courseToPurchase) => {
    // console.log('PAYMENT CLIECKED');
    // dispatch(buyCourse(courseToPurchase));
  };

  return (
    <div className='payment-body'>
      <section>
        <div className='payment-section'>
          <img
            src={courseToPurchase?.thumbnailURL}
            alt={courseToPurchase?.title}
            className='payment-img'
          />
          <div className='description'>
            <h3 className='payment-h3'>{courseToPurchase?.title}</h3>
            <h5 className='payment-h5'>₹{courseToPurchase?.price}</h5>
          </div>
        </div>

        <button
          type='submit'
          id='checkout-button'
          onClick={(e) => onPaymentButtonClick(courseToPurchase)}
        >
          Checkout
        </button>
      </section>
    </div>
  );
};

export default PaymentDetailPage;
