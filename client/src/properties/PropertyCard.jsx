import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <Card className="shadow-sm h-100 d-flex flex-column">
      <Card.Img
        variant="top"
        src={property.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}
        alt={property.title}
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="flex-grow-1">
          <Card.Title className="fw-bold text-success" style={{ fontSize: '1.1rem' }}>
            {property.title.length > 40 ? property.title.slice(0, 40) + '...' : property.title}
          </Card.Title>
          <Card.Text className="mb-1 small">
            <strong>Location:</strong> {property.location}, {property.county}
          </Card.Text>
          <Card.Text className="mb-1 small">
            <strong>Type:</strong> {property.property_type}
          </Card.Text>
          <Card.Text className="mb-1 small">
            <strong>Price:</strong> KSh {Number(property.price).toLocaleString()}
          </Card.Text>
        </div>
        <Link to={`/dashboard/properties/${property.id}`} className="mt-3">
          <Button variant="outline-success" size="sm" className="w-100">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
