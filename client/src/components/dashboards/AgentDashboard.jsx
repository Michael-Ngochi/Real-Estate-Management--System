import api from '../../api/axiosConfig';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const AgentDashboard = () => {
  const { token } = useAuthStore();
  const [stats, setStats] = useState({
    properties: 0,
    inquiries: 0,
    viewings: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [recentViewings, setRecentViewings] = useState([]);

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      console.log("Using token:", token); // 🔍 Log token

      const [propRes, inqRes, viewRes] = await Promise.all([
        api.get('/properties/my', { headers }),
        api.get('/inquiries/my', { headers }),
        api.get('/viewings/my', { headers })
      ]);

      console.log("Properties response:", propRes.data); // 🔍
      console.log("Inquiries response:", inqRes.data);   // 🔍
      console.log("Viewings response:", viewRes.data);   // 🔍

      const inquiries = Array.isArray(inqRes.data) ? inqRes.data : [];
      const viewings = Array.isArray(viewRes.data) ? viewRes.data : [];

      setStats({
        properties: Array.isArray(propRes.data) ? propRes.data.length : 0,
        inquiries: inquiries.length,
        viewings: viewings.length,
      });

      setRecentInquiries(inquiries.slice(0, 5));
      setRecentViewings(viewings.slice(0, 5));
    } catch (err) {
      console.error('❌ Error fetching dashboard data:', err);
      if (err.response) {
        console.error('🔴 Server responded with:', err.response.data);
      }
    }
  };

  fetchStats();
}, [token]);

  return (
    <DashboardLayout>
      <section className="mb-4">
        <div className="bg-success text-white p-4 rounded shadow-sm d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-1">Welcome back!</h4>
            <p className="mb-0">Manage your properties and respond to clients efficiently.</p>
          </div>
          <Button variant="light" className="text-success fw-bold">
            + Add New Property
          </Button>
        </div>
      </section>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h6>Listed Properties</h6>
              <h4 className="text-success">{stats.properties}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h6>Pending Inquiries</h6>
              <h4 className="text-primary">{stats.inquiries}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h6>Scheduled Viewings</h6>
              <h4 className="text-warning">{stats.viewings}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <h5 className="mb-3 fw-semibold">Recent Inquiries</h5>
          <ul className="list-group shadow-sm">
            {recentInquiries.length > 0 ? (
              recentInquiries.map((inq, index) => (
                <li key={index} className="list-group-item">
                  <strong>{inq.client_name || 'Client'}</strong>: {inq.message}
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">No recent inquiries</li>
            )}
          </ul>
        </Col>
        <Col md={6}>
          <h5 className="mb-3 fw-semibold">Upcoming Viewings</h5>
          <ul className="list-group shadow-sm">
            {recentViewings.length > 0 ? (
              recentViewings.map((view, index) => (
                <li key={index} className="list-group-item">
                  <strong>{view.client_name || 'Client'}</strong> –{' '}
                  {new Date(view.scheduled_at).toLocaleString()}
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">No scheduled viewings</li>
            )}
          </ul>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default AgentDashboard;
