
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

  const fetchProperties = async () => {
    try {
      let url = 'https://nyumbasmart.onrender.com/properties';
      const params = [];
      if (county) params.push(`county=${county}`);
      if (type) params.push(`type=${type}`);
      if (minPrice) params.push(`min_price=${minPrice}`);
      if (maxPrice) params.push(`max_price=${maxPrice}`);
      if (params.length) url += '?' + params.join('&');

      const res = await axios.get(url);
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
          <select className="form-select mx-2 mb-2" style={{ maxWidth: '180px' }} onChange={e => setCounty(e.target.value)}>
            <option value="">Select County</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Mombasa">Mombasa</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Nakuru">Nakuru</option>
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
            <option value="1000000">1M</option>
            <option value="5000000">5M</option>
          </select>
          <select className="form-select mx-2 mb-2" style={{ maxWidth: '180px' }} onChange={e => setMaxPrice(e.target.value)}>
            <option value="">Max Price</option>
            <option value="10000000">10M</option>
            <option value="20000000">20M</option>
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
    </div>
  );
};

export default LandingPage;