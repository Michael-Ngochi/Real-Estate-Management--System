
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import { useAuthStore } from '../../store/authStore';

const ViewingModal = ({ show, onClose, propertyId, onSuccess }) => {
  const { token } = useAuthStore();
  const [scheduledAt, setScheduledAt] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/viewings', {
        property_id: propertyId,
        scheduled_at: scheduledAt,
        notes
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setScheduledAt('');
      setNotes('');
      onSuccess?.();
      onClose();
    } catch (err) {
      alert('Failed to book viewing.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton><Modal.Title>Book Viewing</Modal.Title></Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Schedule Date & Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Additional Notes (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'Booking...' : 'Book Viewing'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ViewingModal;
