import React, { useState } from 'react';
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ login, setAlert, isAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  if (isAuth) return <Redirect to='/overview' />;
  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <h1>LOGIN</h1>
          <i class='fas fa-sign-in-alt'> Login to your profile</i>
        </div>
        <div class='form-group'>
          <label>Email address </label>
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
          <label>Password</label>
          <input
            type='password'
            class='form-control'
            name='password'
            required
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>

        <button type='submit' class='btn btn-primary'>
          Submit
        </button>
        <p>
          Don't have an account? Registration is free, click on the signup
          button
        </p>
        <Link to='/register' className='btn btn-primary'>
          Sign Up
        </Link>
      </form>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
});

export default connect(mapStateToProps, { login, setAlert })(Login);
