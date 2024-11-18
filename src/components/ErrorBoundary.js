// src/components/ErrorBoundary.js
import React from 'react';
import { Container, Alert } from 'react-bootstrap';

/**
 * ErrorBoundary component catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a fallback UI.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Update state if an error is encountered
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Log the error details
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
    // Here you can also log errors to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <Container className="mt-5 text-center">
          <Alert variant="danger">
            <h1>Something went wrong.</h1>
            <p>Please try refreshing the page or contact support if the problem persists.</p>
          </Alert>
        </Container>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
