// src/components/EditAsset.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAssetById, updateAsset } from '../redux/actions/assetActions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Button, Spinner, Alert, Form as BootstrapForm } from 'react-bootstrap';

const EditAsset = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentAsset, loading, error } = useSelector((state) => state.assets);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState(''); // 'success' or 'danger'

    useEffect(() => {
        if (!currentAsset || currentAsset.id !== parseInt(id)) {
            dispatch(fetchAssetById(id));
        }
    }, [dispatch, id, currentAsset]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    if (!currentAsset) {
        return <div>No asset found.</div>;
    }

    return (
        <Container className="mt-4" style={{ position: 'relative' }}>
            <h2>Edit Asset</h2>
            {alertMessage && (
                <Alert
                    variant={alertVariant}
                    style={{ position: 'relative', marginBottom: '15px' }}
                    onClose={() => setAlertMessage('')}
                    dismissible
                >
                    {alertMessage}
                </Alert>
            )}
            <Formik
                initialValues={{
                    type: currentAsset.type,
                    model: currentAsset.model,
                    serialNumber: currentAsset.serialNumber,
                    status: currentAsset.status,
                    location: currentAsset.location,
                }}
                validationSchema={Yup.object({
                    type: Yup.string().required('Required'),
                    model: Yup.string().required('Required'),
                    serialNumber: Yup.string().required('Required'),
                    status: Yup.string().required('Required'),
                    location: Yup.string().required('Required'),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        await dispatch(updateAsset(id, values));
                        setAlertMessage('Asset updated successfully!');
                        setAlertVariant('success');
                    } catch (updateError) {
                        if (updateError.response && updateError.response.status === 403) {
                            setAlertMessage('Failed to update asset: You do not have sufficient rights.');
                        } else {
                            setAlertMessage('Failed to update asset. Please try again later.');
                        }
                        setAlertVariant('danger');
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <BootstrapForm.Group controlId="formType" className="mb-3">
                            <BootstrapForm.Label>Type</BootstrapForm.Label>
                            <Field as={BootstrapForm.Control} type="text" name="type" placeholder="Enter type" />
                            <ErrorMessage name="type" component={BootstrapForm.Control.Feedback} type="invalid" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="formModel" className="mb-3">
                            <BootstrapForm.Label>Model</BootstrapForm.Label>
                            <Field as={BootstrapForm.Control} type="text" name="model" placeholder="Enter model" />
                            <ErrorMessage name="model" component={BootstrapForm.Control.Feedback} type="invalid" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="formSerialNumber" className="mb-3">
                            <BootstrapForm.Label>Serial Number</BootstrapForm.Label>
                            <Field as={BootstrapForm.Control} type="text" name="serialNumber" placeholder="Enter serial number" />
                            <ErrorMessage name="serialNumber" component={BootstrapForm.Control.Feedback} type="invalid" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="formStatus" className="mb-3">
                            <BootstrapForm.Label>Status</BootstrapForm.Label>
                            <Field as={BootstrapForm.Control} type="text" name="status" placeholder="Enter status" />
                            <ErrorMessage name="status" component={BootstrapForm.Control.Feedback} type="invalid" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="formLocation" className="mb-3">
                            <BootstrapForm.Label>Location</BootstrapForm.Label>
                            <Field as={BootstrapForm.Control} type="text" name="location" placeholder="Enter location" />
                            <ErrorMessage name="location" component={BootstrapForm.Control.Feedback} type="invalid" />
                        </BootstrapForm.Group>

                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update Asset'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default EditAsset;
