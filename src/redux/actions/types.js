// src/redux/actions/types.js

// Authentication action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // Action type for a successful login
export const LOGIN_FAIL = 'LOGIN_FAIL'; // Action type for a failed login attempt
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'; // Action type for a successful user registration
export const REGISTER_FAIL = 'REGISTER_FAIL'; // Action type for a failed user registration
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'; // Action type for successfully loading user data
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL'; // Action type for failed loading of user data
export const LOGOUT = 'LOGOUT'; // Action type for logging out the user
export const CLEAR_ERRORS = 'CLEAR_ERRORS'; // Action type to clear existing error messages

// Assets action types
export const FETCH_ASSETS_SUCCESS = 'FETCH_ASSETS_SUCCESS'; // Action type for successfully fetching assets
export const FETCH_ASSETS_FAIL = 'FETCH_ASSETS_FAIL'; // Action type for failed fetching of assets
export const FETCH_ASSET_SUCCESS = 'FETCH_ASSET_SUCCESS'; // Action type for successfully fetching a specific asset
export const FETCH_ASSET_FAIL = 'FETCH_ASSET_FAIL'; // Action type for failed fetching of a specific asset
export const UPDATE_ASSET_SUCCESS = 'UPDATE_ASSET_SUCCESS'; // Action type for successfully updating an asset
export const UPDATE_ASSET_FAIL = 'UPDATE_ASSET_FAIL'; // Action type for failed updating of an asset
export const DELETE_ASSET_SUCCESS = 'DELETE_ASSET_SUCCESS'; // Action type for successfully deleting an asset
export const DELETE_ASSET_FAIL = 'DELETE_ASSET_FAIL'; // Action type for failed deletion of an asset
export const CREATE_ASSET_SUCCESS = 'CREATE_ASSET_SUCCESS'; // Action type for successfully creating a new asset
export const CREATE_ASSET_FAIL = 'CREATE_ASSET_FAIL'; // Action type for failed creation of a new asset
export const FETCH_ASSET_BY_ID = 'FETCH_ASSET_BY_ID'; // Action type for fetching an asset by its ID