// src/components/AddAsset.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAsset } from '../redux/actions/assetActions'; // Redux action to create an asset
import { toast } from 'react-toastify';
import { Button, Modal, Form } from 'react-bootstrap';

const AddAsset = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        type: '',
        model: '',
        serialNumber: '',
        purchaseDate: '',
        warrantyStatus: '',
        location: '',
        status: '',
        assignedUserId: '',
    });

    // Hardcoded values for dropdowns
    const statuses = ['Available', 'In Use', 'Under Maintenance', 'Out of Service'];
    const warrantyStatuses = ['Valid', 'Expired', 'Not Applicable'];
    const locations = ['Warehouse A', 'Site B', 'Office C'];

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAsset(formData));  // Dispatch the action to create an asset
        toast.success('Asset created successfully!');
        handleClose();  // Close the modal after submission
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Asset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formType" className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            placeholder="Enter type"
                        />
                    </Form.Group>

                    <Form.Group controlId="formModel" className="mb-3">
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                            placeholder="Enter model"
                        />
                    </Form.Group>

                    <Form.Group controlId="formSerialNumber" className="mb-3">
                        <Form.Label>Serial Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="serialNumber"
                            value={formData.serialNumber}
                            onChange={handleInputChange}
                            placeholder="Enter serial number"
                        />
                    </Form.Group>

                    <Form.Group controlId="formPurchaseDate" className="mb-3">
                        <Form.Label>Purchase Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="purchaseDate"
                            value={formData.purchaseDate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formWarrantyStatus" className="mb-3">
                        <Form.Label>Warranty Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="warrantyStatus"
                            value={formData.warrantyStatus}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Warranty Status</option>
                            {warrantyStatuses.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formLocation" className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            as="select"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Location</option>
                            {locations.map((location, index) => (
                                <option key={index} value={location}>{location}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formStatus" className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Status</option>
                            {statuses.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddAsset;
