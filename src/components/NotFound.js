// src/components/NotFound.js
import React from 'react';
import { Container, Alert } from 'react-bootstrap';

/**
 * NotFound component displays a 404 error message for undefined routes.
 */
const NotFound = () => {
  return (
    <Container className="mt-5 text-center">
      <Alert variant="danger">
        <h1>404</h1>
        <p>Page Not Found</p>
      </Alert>
    </Container>
  );
};

export default NotFound;
