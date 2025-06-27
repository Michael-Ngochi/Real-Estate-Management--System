import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import PropertyCard from '../properties/PropertyCard';

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [counties, setCounties] = useState([]);

  const [county, setCounty] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    // Fetch counties for dropdown
    api.get('/properties/counties')
      .then(res => setCounties(res.data))
      .catch(err => console.error("Failed to load counties", err));
  }, []);

  const fetchProperties = async () => {
    try {
      let url = '/properties';
      const params = [];
      if (county) params.push(`county=${county}`);
      if (type) params.push(`type=${type}`);
      if (minPrice) params.push(`min_price=${minPrice}`);
      if (maxPrice) params.push(`max_price=${maxPrice}`);
      if (params.length) url += '?' + params.join('&');

      const res = await api.get(url);
      setProperties(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProperties(); // initial fetch
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <Container className="my-4">
      <h4 className="mb-4 fw-bold">All Properties</h4>

      {/* Filter Form */}
      <Form onSubmit={handleFilterSubmit} className="mb-4 p-3 bg-light rounded shadow-sm">
        <Row className="g-3">
          <Col md={3}>
            <Form.Select value={county} onChange={e => setCounty(e.target.value)}>
              <option value="">Select County</option>
              {counties.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Select value={type} onChange={e => setType(e.target.value)}>
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="land">Land</option>
              {/* Add more types as needed */}
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
            />
          </Col>

          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
          </Col>

          <Col md={3}>
            <Button variant="success" type="submit" className="w-100">Filter</Button>
          </Col>
        </Row>
      </Form>

      {/* Property Cards */}
      <Row>
        {properties.length > 0 ? (
          properties.map(p => (
            <Col md={4} key={p.id} className="mb-4">
              <PropertyCard property={p} />
            </Col>
          ))
        ) : (
          <p className="text-muted">No properties found for the selected criteria.</p>
        )}
      </Row>
    </Container>
  );
};

export default AllProperties;
