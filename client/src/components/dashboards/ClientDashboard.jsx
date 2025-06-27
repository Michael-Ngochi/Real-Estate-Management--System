import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const ClientDashboard = () => {
  const { token, user } = useAuthStore();
  const [stats, setStats] = useState({
    inquiries: 0,
    viewings: 0,
    applications: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [inqRes, viewRes, appRes] = await Promise.all([
          axios.get('http://127.0.0.1:5000/inquiries/my', { headers }),
          axios.get('http://127.0.0.1:5000/viewings/my', { headers }),
          axios.get('http://127.0.0.1:5000/applications/my', { headers }),
        ]);

        const inquiries = Array.isArray(inqRes.data) ? inqRes.data : [];
        const viewings = Array.isArray(viewRes.data) ? viewRes.data : [];
        const applications = Array.isArray(appRes.data) ? appRes.data : [];

        setStats({
          inquiries: inquiries.length,
          viewings: viewings.length,
          applications: applications.length,
        });

        setRecentInquiries(inquiries.slice(0, 5));
        setRecentApplications(applications.slice(0, 5));
      } catch (err) {
        console.error('Error fetching client dashboard data:', err);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <>
      <section className="mb-4">
        <div className="bg-success text-white p-4 rounded shadow-sm">
          <h4 className="mb-1">Welcome, {user?.name} </h4>
          <p className="mb-0">Track your activity and manage your property interests.</p>
        </div>
      </section>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h6>My Inquiries</h6>
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
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h6>Applications Sent</h6>
              <h4 className="text-success">{stats.applications}</h4>
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
                  <strong>To Property #{inq.property_id}</strong>: {inq.message}
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">No recent inquiries</li>
            )}
          </ul>
        </Col>
        <Col md={6}>
          <h5 className="mb-3 fw-semibold">Recent Applications</h5>
          <ul className="list-group shadow-sm">
            {recentApplications.length > 0 ? (
              recentApplications.map((app, index) => (
                <li key={index} className="list-group-item">
                  <strong>For Property #{app.property_id}</strong> – {app.application_type} – {app.status}
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">No recent applications</li>
            )}
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default ClientDashboard;
