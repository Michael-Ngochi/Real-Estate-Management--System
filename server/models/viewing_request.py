from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from .user import User, db
from .property import Property

class ViewingRequest(db.Model):
    __tablename__ = 'viewing_requests'

    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'))
    scheduled_at = db.Column(db.DateTime)
    status = db.Column(db.Enum('pending', 'confirmed', 'cancelled', name='viewing_status'))
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    client = db.relationship('User', backref='viewing_requests', foreign_keys=[client_id])
    property = db.relationship('Property', backref='viewing_requests', foreign_keys=[property_id])
