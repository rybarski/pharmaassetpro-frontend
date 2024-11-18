// src/components/Layout.js
import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaListAlt } from 'react-icons/fa'; // Import icons
import '../styles/Layout.css'; // Import your CSS file

const Layout = ({ children, onLogout, user }) => {
    const location = useLocation();
  
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
          <Navbar.Brand href="/dashboard" className={location.pathname === '/dashboard' ? 'active' : 'text-white'}>
            <strong>PharmaAssetPro</strong>
          </Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center">
            <Dropdown align="end" className="me-3">
              <Dropdown.Toggle variant="outline-light">
                {user ? `${user.name} (${user.role})` : 'User (Role)'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar>
  
        <div className="sidebar">
          <Nav className="flex-column">
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              <FaTachometerAlt style={{ marginRight: '8px' }} />
              Dashboard
            </Link>
            <Link to="/assets" className={location.pathname === '/assets' ? 'active' : ''}>
              <FaListAlt style={{ marginRight: '8px' }} />
              Asset List
            </Link>
          </Nav>
        </div>
  
        <div className="content">
          {children}
        </div>
      </div>
    );
};
  
export default Layout;
