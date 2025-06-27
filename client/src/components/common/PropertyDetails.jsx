import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import {
  Container, Image, Spinner, Alert, Button, Row, Col, Card, Modal, Form
} from 'react-bootstrap';
import { useAuthStore } from '../../store/authStore';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal state
  const [showInquiry, setShowInquiry] = useState(false);
  const [showViewing, setShowViewing] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [note, setNote] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        setError('Failed to load property details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await api.delete(`/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard/properties');
    } catch (err) {
      alert('Failed to delete property.');
    }
  };

  const submitAction = async (endpoint, extra = {}) => {
    try {
      await api.post(endpoint, { property_id: id, ...extra }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`${endpoint.split('/')[1]} submitted successfully.`);
    } catch {
      alert(`Failed to submit ${endpoint}.`);
    }
  };

  if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <Image
        src={property.image_url || 'https://via.placeholder.com/1200x500?text=No+Image'}
        alt={property.title}
        fluid
        style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
      />

      <Container className="my-5">
        <Card className="p-4 shadow-sm border-0">
          <h3 className="text-success fw-bold mb-3">{property.title}</h3>

          <Row className="mb-3">
            <Col md={6}>
              <p><strong>Location:</strong> {property.location}, {property.county}</p>
              <p><strong>Type:</strong> {property.property_type}</p>
              <p><strong>Area:</strong> {property.area} sq ft</p>
              <p><strong>Price:</strong> <span className="text-primary">KSh {Number(property.price).toLocaleString()}</span></p>
            </Col>
            <Col md={6}>
              {(property.property_type !== "land" && property.property_type !== "shop") && (
                <>
                  <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                  <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                </>
              )}
              <p><strong>Status:</strong> {property.status}</p>
              <p><strong>Description:</strong> {property.description || 'No description available.'}</p>
            </Col>
          </Row>

          {property.agent && (
            <div className="bg-light p-3 rounded mb-4">
              <h6 className="text-muted">Agent In Charge</h6>
              <p className="mb-1"><strong>Name:</strong> {property.agent.name}</p>
              <p className="mb-1"><strong>Email:</strong> {property.agent.email}</p>
              <p className="mb-0"><strong>Phone:</strong> {property.agent.phone}</p>
            </div>
          )}

          {/* Client Actions */}
          {user?.role === 'client' && (
            <div className="d-flex gap-3 mb-3 flex-wrap">
              <Button variant="outline-success" onClick={() => setShowInquiry(true)}>Send Inquiry</Button>
              <Button variant="outline-primary" onClick={() => setShowViewing(true)}>Book Viewing</Button>
              <Button variant="outline-warning" onClick={() => setShowApplication(true)}>Apply</Button>
            </div>
          )}

          {/* Agent Actions */}
          {user?.role === 'agent' && user.id === property.agent_id && (
            <div className="d-flex gap-3 mt-3 flex-wrap">
              <Button variant="outline-secondary" onClick={() => navigate(`/dashboard/properties/edit/${id}`)}>Edit Listing</Button>
              <Button variant="outline-danger" onClick={handleDelete}>Delete Listing</Button>
            </div>
          )}
        </Card>
      </Container>

      {/* Inquiry Modal */}
      <Modal show={showInquiry} onHide={() => setShowInquiry(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Inquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Message (optional)</Form.Label>
            <Form.Control as="textarea" rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInquiry(false)}>Cancel</Button>
          <Button variant="success" onClick={() => { submitAction('/inquiries', { message: note }); setShowInquiry(false); }}>Send</Button>
        </Modal.Footer>
      </Modal>

      {/* Viewing Modal */}
      <Modal show={showViewing} onHide={() => setShowViewing(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book Viewing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Preferred Date & Time</Form.Label>
            <Form.Control type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewing(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => { submitAction('/viewings', { scheduled_at: scheduledAt }); setShowViewing(false); }}>Book</Button>
        </Modal.Footer>
      </Modal>

      {/* Application Modal */}
      <Modal show={showApplication} onHide={() => setShowApplication(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Note to Agent (optional)</Form.Label>
            <Form.Control as="textarea" rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApplication(false)}>Cancel</Button>
          <Button variant="warning" onClick={() => { submitAction('/applications', { note }); setShowApplication(false); }}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PropertyDetails;
