// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

// Fetch Statuses
export const getStatuses = async () => {
  const response = await api.get('/statuses');  // Adjust based on your backend route
  return response.data;
};

// Fetch Locations
export const getLocations = async () => {
  const response = await api.get('/locations');  // Adjust based on your backend route
  return response.data;
};

// Fetch Asset Types
export const getAssetTypes = async () => {
  const response = await api.get('/asset-types');  // Adjust based on your backend route
  return response.data;
};

// Fetch Warranties
export const getWarranties = async () => {
  const response = await api.get('/warranties');  // Adjust based on your backend route
  return response.data;
};

export default api;
