
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from .user import db



class PropertyMedia(db.Model):
    __tablename__ = 'property_media'

    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'))
    media_url = db.Column(db.String(255))
    media_type = db.Column(db.Enum('image', 'video', 'floorplan', name='media_type'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
