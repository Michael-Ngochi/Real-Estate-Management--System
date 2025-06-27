import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const AddPropertyForm = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    county: '',
    town: '',
    geo_coordinates: '',
    price: '',
    property_type: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    status: 'available',
    image_url: ''
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Step 1: Create the property
      const res = await api.post('/properties', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Step 2: Get the new property's ID from the backend (optional enhancement: return full object)
      const propertyListRes = await api.get('/properties', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const latestProperty = propertyListRes.data
        .filter(p => p.title === formData.title)
        .sort((a, b) => b.id - a.id)[0];

      // Step 3: Upload the media (image URL)
      if (formData.image_url && latestProperty) {
        await api.post('/media/add', {
          property_id: latestProperty.id,
          media_url: formData.image_url,
          media_type: 'image'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      navigate('/dashboard/properties');
    } catch (err) {
      console.error(err);
      setError('Failed to add property.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="my-5">
      <h4 className="fw-bold text-success mb-4">Add New Property</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={formData.title} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control name="location" value={formData.location} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>County</Form.Label>
              <Form.Control name="county" value={formData.county} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Town</Form.Label>
              <Form.Control name="town" value={formData.town} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Geo Coordinates</Form.Label>
              <Form.Control name="geo_coordinates" value={formData.geo_coordinates} onChange={handleChange} placeholder="-1.3032,36.7073" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Property Type</Form.Label>
              <Form.Select name="property_type" value={formData.property_type} onChange={handleChange} required>
                <option value="">-- Select --</option>
                <option value="apartment">Apartment</option>
                <option value="maisonette">Maisonette</option>
                <option value="bedsitter">Bedsitter</option>
                <option value="shop">Shop</option>
                <option value="land">Land</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://images.unsplash.com/..." />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Price (KES)</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bathrooms</Form.Label>
              <Form.Control type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Area (sq ft)</Form.Label>
              <Form.Control type="number" name="area" value={formData.area} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange} required>
                <option value="available">Available</option>
                <option value="under_offer">Under Offer</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} rows={3} />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="success" type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Add Property'}
        </Button>
      </Form>
    </Container>
  );
};

export default AddPropertyForm;
