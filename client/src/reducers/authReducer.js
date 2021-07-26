import {
  REGISTER_SUCCESS,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  loading: true,
  isAuth: false,
  user: null,
  isAdmin: false,
};

export default function (state = { initialState }, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        loading: false,
        isAuth: true,
        isAdmin: payload.admin,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuth: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuth: false,
        token: null,
        loading: false,
        isAdmin: false,
        user: null,
      };
    default:
      return state;
  }
}
