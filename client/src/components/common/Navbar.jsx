import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as RBNavbar, Nav, Container, Image, Dropdown } from 'react-bootstrap';
import logo from '../../assets/logo.svg';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <RBNavbar expand="lg" bg="white" variant="light" className="shadow-sm">
      <Container>
        <RBNavbar.Brand as={Link} to="/" className="text-success fw-bold">
          <img src={logo} alt="NyumbaSmart logo" width="30" className="me-2" />
          NyumbaSmart
        </RBNavbar.Brand>

        <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
        <RBNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {!user ? (
              <>
                <Link to="/login" className="btn btn-outline-success me-2">Log In</Link>
                <Link to="/register" className="btn btn-success">Get Started</Link>
              </>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="avatar-dropdown" className="d-flex align-items-center border-0">
                  <Image
                    src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff&rounded=true`}
                    roundedCircle
                    width="40"
                    height="40"
                    className="border"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>Hello, {user.name.split(' ')[0]}</Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};

export default Navbar;
