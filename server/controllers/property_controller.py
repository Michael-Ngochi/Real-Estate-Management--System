from flask import Blueprint, request, jsonify
from models.property import Property, db
from flask_jwt_extended import jwt_required, get_jwt_identity

property_bp = Blueprint('property', __name__, url_prefix='/properties')

@property_bp.route('/', methods=['GET'])
def list_properties():
    properties = Property.query.all()
    return jsonify([{
        'id': p.id,
        'title': p.title,
        'location': p.location,
        'price': float(p.price),
        'property_type': p.property_type,
        'status': p.status
    } for p in properties])

@property_bp.route('/', methods=['POST'])
@jwt_required()
def create_property():
    data = request.json
    identity = get_jwt_identity()
    property = Property(
        title=data['title'],
        description=data.get('description'),
        location=data['location'],
        price=data['price'],
        property_type=data['property_type'],
        bedrooms=data.get('bedrooms'),
        bathrooms=data.get('bathrooms'),
        area=data.get('area'),
        status=data['status'],
        agent_id=identity['id']
    )
    db.session.add(property)
    db.session.commit()
    return jsonify({'message': 'Property created successfully'}), 201