
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PropertyCard = ({ property }) => (
  <Card className="shadow-sm h-100">
    <Card.Img
      variant="top"
      src={property.image_url || 'https://via.placeholder.com/300x200'}
    />
    <Card.Body>
      <Card.Title>{property.title}</Card.Title>
      <Card.Text>{property.location} • {property.bedrooms} bed • {property.bathrooms} bath</Card.Text>
      <h5 className="text-success">KES {property.price.toLocaleString()}</h5>
      <Button variant="success">View Details</Button>
    </Card.Body>
  </Card>
);

export default PropertyCard;
