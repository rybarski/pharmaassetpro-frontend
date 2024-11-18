// src/redux/actions/authActions.js
import api from '../../services/api';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CLEAR_ERRORS,
} from './types';

// Clear Errors action
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// Load User action
export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      console.log("Attempting to load user with token:", token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await api.get('/users/profile');
      console.log("User profile loaded successfully:", res.data.user);

      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res.data.user,
      });
    } catch (err) {
      console.error("Error loading user:", err.response ? err.response.data : err.message);
      dispatch({
        type: LOAD_USER_FAIL,
      });
    }
  } else {
    console.log("No token found, user load not attempted.");
    dispatch({
      type: LOAD_USER_FAIL,
    });
  }
};

// Login action
export const login = (values, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/users/login', values);
    const { token, user } = res.data;
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user },
    });
    localStorage.setItem('token', token);
    navigate('/dashboard');
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: 'Login failed' });
  }
};

// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('token'); // Remove the token from localStorage
  delete api.defaults.headers.common['Authorization']; // Remove the auth header
  dispatch({ type: LOGOUT });
  dispatch(clearErrors()); // Ensure errors are cleared on logout
};

// Register action
export const register = (values, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/users/register', values);
    const { token, user } = res.data;
    dispatch({ type: REGISTER_SUCCESS });
    dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
    localStorage.setItem('token', token);
    navigate('/dashboard');
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: 'Registration failed' });
  }
};