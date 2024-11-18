// src/components/Register.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../redux/actions/authActions';
import {
  Container,
  Form as BootstrapForm,
  Button,
  Alert,
  Row,
  Col,
  Card,
} from 'react-bootstrap';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  // If user is already authenticated, redirect to dashboard
  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Register</Card.Title>
              {auth.error && <Alert variant="danger">{auth.error}</Alert>}
              <Formik
                initialValues={{ name: '', email: '', password: '', role: 'User' }}
                validationSchema={Yup.object({
                  name: Yup.string().required('Required'),
                  email: Yup.string().email('Invalid email address').required('Required'),
                  password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
                  role: Yup.string().oneOf(['Admin', 'Asset Manager', 'User']).required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  dispatch(register(values, navigate));
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting, touched, errors }) => (
                  <Form>
                    <BootstrapForm.Group controlId="formName" className="mb-3">
                      <BootstrapForm.Label>Name</BootstrapForm.Label>
                      <Field
                        as={BootstrapForm.Control}
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        isInvalid={touched.name && Boolean(errors.name)}
                      />
                      <ErrorMessage name="name" component={BootstrapForm.Control.Feedback} type="invalid" />
                    </BootstrapForm.Group>

                    <BootstrapForm.Group controlId="formEmail" className="mb-3">
                      <BootstrapForm.Label>Email address</BootstrapForm.Label>
                      <Field
                        as={BootstrapForm.Control}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        isInvalid={touched.email && Boolean(errors.email)}
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
                        isInvalid={touched.password && Boolean(errors.password)}
                      />
                      <ErrorMessage name="password" component={BootstrapForm.Control.Feedback} type="invalid" />
                    </BootstrapForm.Group>

                    <BootstrapForm.Group controlId="formRole" className="mb-3">
                      <BootstrapForm.Label>Role</BootstrapForm.Label>
                      <Field as={BootstrapForm.Select} name="role">
                        <option value="User">User</option>
                        <option value="Asset Manager">Asset Manager</option>
                        <option value="Admin">Admin</option>
                      </Field>
                      <ErrorMessage name="role" component={BootstrapForm.Control.Feedback} type="invalid" />
                    </BootstrapForm.Group>

                    <Button variant="primary" type="submit" disabled={isSubmitting} className="w-100">
                      {isSubmitting ? 'Registering...' : 'Register'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
