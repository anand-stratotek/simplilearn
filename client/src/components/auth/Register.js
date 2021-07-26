import React, { useState } from 'react';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Register = ({ register, setAlert, isAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password1: '',
  });

  const { email, password, password1 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password === password1) register(formData);
    else setAlert('Passwords do not match', 'danger');
  };

  if (isAuth) return <Redirect to='/overview' />;
  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <h1>REGISTER</h1>
          <i class='fas fa-cash-register'>
            {' '}
            Register without any cost to enjoy the awesome contents/features of
            this Application
          </i>
        </div>

        <div class='form-group'>
          <label>Email address *</label>
          <input
            type='email'
            class='form-control'
            name='email'
            required
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <label>Password *</label>
          <input
            type='password'
            class='form-control'
            name='password'
            required
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <label>Confirm Password *</label>
          <input
            type='password'
            class='form-control'
            name='password1'
            required
            value={password1}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button type='submit' class='btn btn-primary'>
          Submit
        </button>
        <p>
          Already have an account? Click on the SignIn button to log in your
          profile
        </p>
        <Link to='/login' className='btn btn-primary'>
          Sign In
        </Link>
      </form>
    </>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
