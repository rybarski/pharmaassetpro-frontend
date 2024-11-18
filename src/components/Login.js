// src/components/Login.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../redux/actions/authActions';
import {
  Container,
  Form as BootstrapForm,
  Button,
  Alert,
  Row,
  Col,
  Card,
} from 'react-bootstrap';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={6} lg={5} className="mx-auto">
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Login</Card.Title>
              
              {auth.error && <Alert variant="danger">{auth.error}</Alert>}
              
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                  email: Yup.string().email('Invalid email address').required('Required'),
                  password: Yup.string().required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  dispatch(login(values, navigate));
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <BootstrapForm.Group controlId="formEmail" className="mb-3">
                      <BootstrapForm.Label>Email address</BootstrapForm.Label>
                      <Field
                        as={BootstrapForm.Control}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                      />
                      <ErrorMessage name="email" component={BootstrapForm.Control.Feedback} type="invalid" />
                    </BootstrapForm.Group>

                    <BootstrapForm.Group controlId="formPassword" className="mb-3">
                      <BootstrapForm.Label>Password</BootstrapForm.Label>
                      <Field
                        as={BootstrapForm.Control}
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                      <ErrorMessage name="password" component={BootstrapForm.Control.Feedback} type="invalid" />
                    </BootstrapForm.Group>

                    <Button variant="primary" type="submit" disabled={isSubmitting} className="w-100">
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                  </Form>
                )}
              </Formik>

              <div className="text-center mt-3">
                <span>Don't have an account? </span>
                <Link to="/register" className="text-primary" style={{ textDecoration: 'none' }}>
                  Register
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
