import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <Card className="shadow-sm h-100">
      <Card.Img
        variant="top"
        src={property.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}
        alt={property.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title className="fw-bold text-success">{property.title}</Card.Title>
        <Card.Text className="mb-1">
          <strong>Location:</strong> {property.location}, {property.county}
        </Card.Text>
        <Card.Text className="mb-1">
          <strong>Type:</strong> {property.property_type}
        </Card.Text>
        <Card.Text className="mb-1">
          <strong>Price:</strong> KSh {Number(property.price).toLocaleString()}
        </Card.Text>
        <Link to={`/dashboard/properties/${property.id}`}>
          <Button variant="outline-success" className="w-100 mt-2">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
