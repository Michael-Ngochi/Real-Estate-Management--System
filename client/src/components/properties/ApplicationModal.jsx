
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import { useAuthStore } from '../../store/authStore';

const ApplicationModal = ({ show, onClose, propertyId, onSuccess }) => {
  const { token } = useAuthStore();
  const [applicationType, setApplicationType] = useState('rent');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/applications', {
        property_id: propertyId,
        application_type: applicationType,
        message
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('');
      onSuccess?.();
      onClose();
    } catch (err) {
      alert('Failed to submit application.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton><Modal.Title>Submit Application</Modal.Title></Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Application Type</Form.Label>
            <Form.Select value={applicationType} onChange={(e) => setApplicationType(e.target.value)}>
              <option value="rent">Rent</option>
              <option value="purchase">Purchase</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Message (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="warning" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Apply'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ApplicationModal;
