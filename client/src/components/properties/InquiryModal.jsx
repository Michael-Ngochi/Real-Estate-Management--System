import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import { useAuthStore } from '../../store/authStore';

const InquiryModal = ({ show, onClose, propertyId, onSuccess }) => {
  const { token } = useAuthStore();
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/inquiries/', { property_id: propertyId, message }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('');
      onSuccess?.();
      onClose();
    } catch (err) {
      alert('Failed to send inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton><Modal.Title>Send Inquiry</Modal.Title></Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Your Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="success" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Inquiry'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default InquiryModal;
