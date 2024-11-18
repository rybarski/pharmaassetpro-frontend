// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import { loadUser, logout } from './redux/actions/authActions';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AssetList from './components/AssetList';
import AssetDetails from './components/AssetDetails';
import AddAsset from './components/AddAsset';
import EditAsset from './components/EditAsset';
import Layout from './components/Layout'; // Import the Layout component
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

import 'bootstrap/dist/css/bootstrap.min.css';

const AppContent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);

  if (loading) return <div>Loading...</div>;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
      <ErrorBoundary>
        {isAuthenticated ? (
            <Layout user={user} onLogout={handleLogout}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/assets" element={<AssetList />} />
                <Route path="/assets/:id" element={<AssetDetails />} /> {/* Updated to use 'element' prop */}
                <Route path="/add-asset" element={<AddAsset />} />
                  <Route path="/assets/edit/:id" element={<EditAsset />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
        ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        )}
      </ErrorBoundary>
  );
};

const App = () => (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
);

export default App;
