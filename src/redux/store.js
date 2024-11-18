import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import assetReducer from './reducers/assetReducer';  // Assuming you have an assetReducer for managing assets

const rootReducer = combineReducers({
  auth: authReducer,
  assets: assetReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
