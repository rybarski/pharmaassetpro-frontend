// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import assetReducer from './assetReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  assets: assetReducer,
});

export default rootReducer;
