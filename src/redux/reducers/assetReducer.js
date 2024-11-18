// src/redux/reducers/assetReducer.js

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
} from '../actions/types';

const initialState = {
  assets: [],
  totalCount: 0, // Ensure this field is initialized
  currentAsset: null,
  selectedAsset: null,
  loading: true,
  error: null,
};

const assetReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ASSETS_SUCCESS:
      console.log('Payload totalCount:', payload.totalCount); // Debug log to check totalCount
      return {
        ...state,
        assets: payload.assets, // Set the assets data in the state
        totalCount: payload.totalCount, // Set the total count for pagination
        totalPages: payload.totalPages, // Set total pages for pagination
        currentPage: payload.currentPage, // Set current page for pagination
        loading: false,
        error: null,
      };
    case FETCH_ASSETS_FAIL:
      return {
        ...state,
        assets: [],
        totalCount: 0, // Reset totalCount on failure
        loading: false,
        error: payload, // Set error if fetching assets fails
      };
    case FETCH_ASSET_SUCCESS:
      return {
        ...state,
        currentAsset: payload, // Set the currently viewed/updated asset
        loading: false,
        error: null,
      };
    case FETCH_ASSET_FAIL:
      return {
        ...state,
        currentAsset: null, // Clear current asset if fetching fails
        loading: false,
        error: payload, // Set error if fetching specific asset fails
      };
    case UPDATE_ASSET_SUCCESS:
      return {
        ...state,
        currentAsset: payload, // Update the asset in the state with the new values
        loading: false,
        error: null,
      };
    case UPDATE_ASSET_FAIL:
      return {
        ...state,
        loading: false,
        error: payload, // Set error if updating the asset fails
      };
    default:
      return state;
  }
};

export default assetReducer;
