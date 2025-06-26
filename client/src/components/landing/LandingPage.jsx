import api from '../../api/axiosConfig';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropertyCard from '../../properties/PropertyCard';
import axios from 'axios';

const LandingPage = () => {
  const [properties, setProperties] = useState([]);
  const [county, setCounty] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [counties, setCounties] = useState([]);


  useEffect(() => {
  fetchProperties();
  api.get("/properties/counties")
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
    fetchProperties();
  }, []);

  return (
    <div>
      <section className="text-center bg-success bg-opacity-10 py-5">
        <h1 className="fw-bold">Find Your Perfect <span className="text-success">Kenyan Home</span></h1>
        <p className="lead">Discover premium properties across Kenya’s major cities.</p>
        <div className="d-flex justify-content-center my-4 flex-wrap">
           <select
             className="form-select mx-2 mb-2"
             style={{ maxWidth: '180px' }}
             onChange={e => setCounty(e.target.value)}
           >
             <option value="">Select County</option>
             {counties.map((county, i) => (
               <option key={i} value={county}>{county}</option>
             ))}
           </select>
          <select className="form-select mx-2 mb-2" style={{ maxWidth: '180px' }} onChange={e => setType(e.target.value)}>
            <option value="">Any Type</option>
            <option value="apartment">Apartment</option>
            <option value="bedsitter">Bedsitter</option>
            <option value="maisonette">Maisonette</option>
            <option value="land">Land</option>
          </select>
          <select className="form-select mx-2 mb-2" style={{ maxWidth: '180px' }} onChange={e => setMinPrice(e.target.value)}>
            <option value="">Min Price</option>
            <option value="5000">KSh 5K</option>
            <option value="20000">KSh 20K</option>
            <option value="50000">KSh 50K</option>
            <option value="100000">KSh 100K</option>
            <option value="500000">KSh 500K</option>
            <option value="1000000">KSh 1M</option>
            <option value="3000000">KSh 3M</option>
          </select>
          <select className="form-select mx-2 mb-2" style={{ maxWidth: '180px' }} onChange={e => setMaxPrice(e.target.value)}>
            <option value="">Max Price</option>
            <option value="20000">KSh 20K</option>
            <option value="50000">KSh 50K</option>
            <option value="100000">KSh 100K</option>
            <option value="500000">KSh 500K</option>
            <option value="1000000">KSh 1M</option>
            <option value="5000000">KSh 5M</option>
            <option value="10000000">KSh 10M</option>
            <option value="20000000">KSh 20M</option>
          </select>

          <Button variant="success" onClick={fetchProperties}>Search Properties</Button>
        </div>
      </section>
      <Container className="my-5">
        <h4 className="text-center mb-4 fw-bold">Featured Properties</h4>
        <Row className="justify-content-center">
          {properties.map((property) => (
            <Col md={4} className="mb-4" key={property.id}>
              <PropertyCard property={property} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* CTA Section */}
<section className="bg-success text-white text-center py-5">
  <h2 className="fw-bold">Ready to Find Your Dream Home?</h2>
  <p className="lead">Join thousands of Kenyans who have found their perfect property through NyumbaSmart</p>
  <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
    <Button variant="light" className="d-flex align-items-center gap-2">
      <i className="bi bi-person-plus"></i> Create Account
    </Button>
    <Button variant="light" className="d-flex align-items-center gap-2">
      <i className="bi bi-house-door"></i> List Property
    </Button>
  </div>
</section>

{/* Footer */}
<footer className="bg-dark text-white pt-5 pb-3">
  <Container>
    <Row className="mb-4">
      <Col md={3}>
        <h5 className="fw-bold text-success">
          <i className="bi bi-house-door-fill me-2"></i>NyumbaSmart
        </h5>
        <p>Kenya’s premier real estate platform connecting buyers, sellers, and renters.</p>
      </Col>
      <Col md={3}>
        <h6 className="fw-bold">For Buyers</h6>
        <ul className="list-unstyled">
          <li>Browse Properties</li>
          <li>Search by Location</li>
          <li>Save Favorites</li>
          <li>Contact Agents</li>
        </ul>
      </Col>
      <Col md={3}>
        <h6 className="fw-bold">For Agents</h6>
        <ul className="list-unstyled">
          <li>List Properties</li>
          <li>Manage Inquiries</li>
          <li>Schedule Viewings</li>
          <li>Agent Dashboard</li>
        </ul>
      </Col>
      <Col md={3}>
        <h6 className="fw-bold">Support</h6>
        <ul className="list-unstyled">
          <li>Help Center</li>
          <li>Contact Us</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
        </ul>
      </Col>
    </Row>
    <div className="text-center small text-muted">
      © 2024 NyumbaSmart. All rights reserved.
    </div>
  </Container>
</footer>

    </div>
  );
};

export default LandingPage;