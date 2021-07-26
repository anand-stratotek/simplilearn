import axios from 'axios';
import { setAlert } from './alert';
import setToken from '../utils/setToken';
import {
  REGISTER_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOAD_USER,
  LOGIN_SUCCESS,
  LOGOUT,
} from './types';

//Register a User
export const register = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('api/users/', formData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Login a User
export const login = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('api/auth/', formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.mgs, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Load a User
export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.getItem('token')) {
      setToken(localStorage.token);
    }
    const res = await axios.get('api/auth/');

    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
