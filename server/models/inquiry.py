from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from .user import db
from sqlalchemy.orm import relationship

class Inquiry(db.Model):
    __tablename__ = 'inquiries'

    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'))
    message = db.Column(db.Text)
    status = db.Column(db.Enum('pending', 'responded', 'closed', name='inquiry_status'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # relationships:
    client = relationship('User', backref='inquiries', foreign_keys=[client_id])
    property = relationship('Property', backref='inquiries', foreign_keys=[property_id])
