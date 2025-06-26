from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from .user import User,db


class Property(db.Model):
    __tablename__ = 'properties'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    geo_coordinates = db.Column(db.String(50))
    county = db.Column(db.String(100))
    town = db.Column(db.String(100))
    location = db.Column(db.String(200))
    price = db.Column(db.Numeric, nullable=False)
    property_type = db.Column(db.String(50))
    bedrooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    area = db.Column(db.Float)
    status = db.Column(db.Enum('available', 'under_offer', 'sold', 'rented', name='property_status'), nullable=False)
    agent_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
