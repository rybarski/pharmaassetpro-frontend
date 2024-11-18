// src/components/AssetDetails.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAssetById } from '../redux/actions/assetActions';
import { Card, Button } from 'react-bootstrap';

const AssetDetails = () => {
  const { id } = useParams(); // Extract asset ID from the route parameters
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extract the asset state using useSelector, making sure to access the correct state path
  const { currentAsset, loading, error } = useSelector((state) => state.assets);

  useEffect(() => {
    if (!currentAsset || currentAsset.id !== parseInt(id)) {
      dispatch(fetchAssetById(id)); // Fetch the asset details based on ID
    }
  }, [dispatch, id, currentAsset]);

  if (loading) {
    return <div>Loading asset details...</div>;
  }

  if (error) {
    return <div>Error loading asset details: {error}</div>;
  }

  if (!currentAsset) {
    return <div>No asset found.</div>;
  }

  return (
      <div className="asset-details">
        <Card>
          <Card.Header as="h5">Asset Details - {currentAsset.type}</Card.Header>
          <Card.Body>
            <Card.Text><strong>Model:</strong> {currentAsset.model}</Card.Text>
            <Card.Text><strong>Serial Number:</strong> {currentAsset.serialNumber}</Card.Text>
            <Card.Text><strong>Status:</strong> {currentAsset.status}</Card.Text>
            <Card.Text><strong>Location:</strong> {currentAsset.location}</Card.Text>
            <Card.Text><strong>Purchase Date:</strong> {new Date(currentAsset.purchaseDate).toLocaleDateString()}</Card.Text>
            <Card.Text><strong>Warranty Status:</strong> {currentAsset.warrantyStatus}</Card.Text>
            <Button variant="primary" onClick={() => navigate('/assets')}>Back to Asset List</Button>
          </Card.Body>
        </Card>
      </div>
  );
};

export default AssetDetails;
