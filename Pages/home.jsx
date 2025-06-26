import { useState } from "react";
import { Formik, Form, Field } from "formik";
import "../styles.css";

// Mock property data
const mockProperties = [
  {
    id: 1,
    title: "2BR in Syokimau",
    location: "Nairobi",
    price: 35000,
    type: "Apartment",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "Bedsitter in Rongai",
    location: "Kajiado",
    price: 12000,
    type: "Bedsitter",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "Land for Sale in Kisumu",
    location: "Kisumu",
    price: 1500000,
    type: "Land",
    image: "https://via.placeholder.com/300x200",
  },
];

export default function Home() {
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);

  return (
    <div className="page">
      <h2>🏘️ Find Your Ideal Property</h2>

      {/* Filters */}
      <Formik
        initialValues={{
          location: "",
          type: "",
          maxPrice: "",
        }}
        onSubmit={(values) => {
          const filtered = mockProperties.filter((property) => {
            const matchesLocation = values.location
              ? property.location.toLowerCase().includes(values.location.toLowerCase())
              : true;
            const matchesType = values.type
              ? property.type.toLowerCase() === values.type.toLowerCase()
              : true;
            const matchesPrice = values.maxPrice
              ? property.price <= parseInt(values.maxPrice)
              : true;
            return matchesLocation && matchesType && matchesPrice;
          });
          setFilteredProperties(filtered);
        }}
      >
        <Form className="filter-form">
          <label>
            County / Town:
            <Field type="text" name="location" />
          </label>

          <label>
            Property Type:
            <Field as="select" name="type">
              <option value="">Any</option>
              <option value="Apartment">Apartment</option>
              <option value="Bedsitter">Bedsitter</option>
              <option value="Maisonette">Maisonette</option>
              <option value="Land">Land</option>
            </Field>
          </label>

          <label>
            Max Price (KES):
            <Field type="number" name="maxPrice" />
          </label>

          <button type="submit">🔍 Filter</button>
        </Form>
      </Formik>

      {/* Listings */}
      <div className="listing-grid">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="listing-card">
              <img src={property.image} alt={property.title} />
              <h4>{property.title}</h4>
              <p><strong>{property.location}</strong></p>
              <p>KES {property.price.toLocaleString()}</p>
              <p>{property.type}</p>
              <button>View</button>
            </div>
          ))
        ) : (
          <p>No properties match your filters.</p>
        )}
      </div>
    </div>
  );
}
