import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { purchaseCourse } from '../../actions/courses';
import { Link, Redirect, useHistory } from 'react-router-dom';

const CustomPayment = ({ location }) => {
  const courseToPurchase = location.state?.course;
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.authReducer?.user?.email);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    otp: '',
  });

  const [paymentDone, setpaymentDone] = useState(false);
  const { cardNumber, expiryDate, cvv, otp } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    if (otp === '123456') {
      courseToPurchase['email'] = userEmail;
      dispatch(purchaseCourse(courseToPurchase));
      history.push('/overview');
    }
  };

  const payment = (e) => {
    e.preventDefault();
    setpaymentDone(true);
  };
  return (
    <>
      <form onSubmit={(e) => payment(e)}>
        <div>
          <h1>Payment Card Details</h1>
        </div>

        <div class='form-group'>
          <label>Card Details *</label>
          <input
            type='number'
            class='form-control'
            name='cardNumber'
            required
            value={cardNumber}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <label>Valid Till</label>
          <input
            type='month'
            id='start'
            name='start'
            class='form-control'
            name='expiryDate'
            required
            value={expiryDate}
            onChange={(e) => onChange(e)}
          ></input>
        </div>
        <div class='form-group'>
          <label>CVV</label>
          <input
            type='number'
            class='form-control'
            name='cvv'
            required
            value={cvv}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button type='submit' class='btn btn-primary'>
          PAY
        </button>
      </form>
      {paymentDone && (
        <div>
          <div class='form-group'>
            <label>OTP</label>
            <input
              type='number'
              class='form-control'
              name='otp'
              required
              value={otp}
              onChange={(e) => onChange(e)}
            />
          </div>
          <Link class='btn btn-primary' onClick={onSubmit} to='/overview'>
            SUBMIT
          </Link>
        </div>
      )}
    </>
  );
};

export default CustomPayment;
