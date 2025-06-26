import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setToken, setUser } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://nyumbasmart.onrender.com/auth/login', {
        email,
        password
      });

      const token = res.data.access_token;
      setToken(token);

      // Get current user info
      const meRes = await axios.get('https://nyumbasmart.onrender.com/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(meRes.data);

      if (meRes.data.role === 'admin') navigate('/admin-dashboard');
      else if (meRes.data.role === 'agent') navigate('/agent-dashboard');
      else navigate('/client-dashboard');


    } catch (err) {
      const msg = err.response?.data?.error || "Login failed. Please check your credentials.";
      alert(msg);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-4 text-success">Login to NyumbaSmart</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Log In
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
