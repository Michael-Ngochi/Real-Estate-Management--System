import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import { useAuthStore } from '../../store/authStore';

const EditPropertyForm = () => {
  const { token } = useAuthStore();
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        setFormData({ ...res.data, image_url: res.data.image_url || '' });
      } catch (err) {
        setError('Failed to fetch property details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.put(`/properties/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard/properties');
    } catch (err) {
      setError('Failed to update property.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;

  return (
    <Container className="my-5">
      <h4 className="fw-bold text-success mb-4">Edit Property</h4>
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
              <Form.Control name="geo_coordinates" value={formData.geo_coordinates} onChange={handleChange} />
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
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="available">Available</option>
                <option value="under_offer">Under Offer</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://example.com/image.jpg" />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="success" disabled={submitting}>
          {submitting ? 'Updating...' : 'Update Property'}
        </Button>
      </Form>
    </Container>
  );
};

export default EditPropertyForm;
