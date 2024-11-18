// src/redux/actions/assetActions.js
import api from '../../services/api';
import {
  FETCH_ASSETS_SUCCESS,
  FETCH_ASSETS_FAIL,
  FETCH_ASSET_SUCCESS,
  FETCH_ASSET_FAIL,
  UPDATE_ASSET_SUCCESS,
  UPDATE_ASSET_FAIL,
  DELETE_ASSET_SUCCESS,
  DELETE_ASSET_FAIL,
  CREATE_ASSET_SUCCESS,
  CREATE_ASSET_FAIL
} from './types';

// Fetch all assets
export const fetchAssets = (page = 1, search = '', limit = 10, sort = 'id', order = 'asc') => async (dispatch) => {
  try {
    const response = await api.get(`/assets?page=${page}&limit=${limit}&search=${search}&sort=${sort}&order=${order}`);
    console.log('API Response:', response.data); // Log to check API response
    dispatch({
      type: FETCH_ASSETS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching assets:', error.response?.data || error.message);
    dispatch({
      type: FETCH_ASSETS_FAIL,
      payload: error.response?.data?.message || 'Failed to fetch assets',
    });
  }
};

// Fetch a single asset
export const fetchAssetById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/assets/${id}`);
    console.log("Asset data fetched:", res.data); // Add this line to verify data fetching
    dispatch({
      type: FETCH_ASSET_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error('Error fetching asset:', err);
    dispatch({
      type: FETCH_ASSET_FAIL,
      payload: 'Error fetching asset',
    });
  }
};

// Create Asset action
export const createAsset = (assetData) => async (dispatch) => {
  try {
    const res = await api.post('/assets', assetData);
    dispatch({
      type: CREATE_ASSET_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_ASSET_FAIL,
      payload: err.response.data,
    });
  }
};

// Update asset
export const updateAsset = (id, data) => async (dispatch) => {
  try {
    const res = await api.put(`/assets/${id}`, data);
    dispatch({
      type: UPDATE_ASSET_SUCCESS,
      payload: res.data.asset,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_ASSET_FAIL,
      payload: 'Failed to update asset',
    });
  }
};

// Delete asset
export const deleteAsset = (id) => async (dispatch) => {
  try {
    await api.delete(`/assets/${id}`);
    dispatch({
      type: DELETE_ASSET_SUCCESS,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: DELETE_ASSET_FAIL,
      payload: 'Failed to delete asset',
    });
  }
};
