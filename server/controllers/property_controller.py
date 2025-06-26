from flask import Blueprint, request, jsonify
from models.property import Property, db
from flask_jwt_extended import jwt_required, get_jwt_identity

property_bp = Blueprint('property', __name__, url_prefix='/properties')

@property_bp.route('/', methods=['GET'])
def list_properties():
    query = Property.query

    # Apply filters from query parameters
    if county := request.args.get('county'):
        query = query.filter_by(county=county)
    if town := request.args.get('town'):
        query = query.filter_by(town=town)
    if property_type := request.args.get('type'):
        query = query.filter_by(property_type=property_type)
    if status := request.args.get('status'):
        query = query.filter_by(status=status)

    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    if min_price is not None:
        query = query.filter(Property.price >= min_price)
    if max_price is not None:
        query = query.filter(Property.price <= max_price)

    properties = query.all()
    return jsonify([{
        'id': p.id,
        'title': p.title,
        'location': p.location,
        'county': p.county,
        'town': p.town,
        'geo_coordinates': p.geo_coordinates,
        'price': float(p.price),
        'property_type': p.property_type,
        'bedrooms': p.bedrooms,
        'bathrooms': p.bathrooms,
        'area': p.area,
        'status': p.status,
        'agent_id': p.agent_id
    } for p in properties])


@property_bp.route("/counties", methods=["GET"])
def get_counties():
    counties = db.session.query(Property.county).distinct().all()
    return jsonify([c[0] for c in counties])



@property_bp.route('/<int:id>', methods=['GET'])
def get_property(id):
    prop = Property.query.get_or_404(id)
    return jsonify({
        'id': prop.id,
        'title': prop.title,
        'description': prop.description,
        'location': prop.location,
        'county': prop.county,
        'town': prop.town,
        'geo_coordinates': prop.geo_coordinates,
        'price': float(prop.price),
        'property_type': prop.property_type,
        'bedrooms': prop.bedrooms,
        'bathrooms': prop.bathrooms,
        'area': prop.area,
        'status': prop.status,
        'agent_id': prop.agent_id
    })
    
    
@property_bp.route('/my', methods=['GET'])
@jwt_required()
def get_my_properties():
    user_id = int(get_jwt_identity())

    props = Property.query.filter_by(agent_id=user_id).all()

    return jsonify([{
        'id': p.id,
        'title': p.title,
        'location': p.location,
        'county': p.county,
        'town': p.town,
        'geo_coordinates': p.geo_coordinates,
        'price': float(p.price),
        'property_type': p.property_type,
        'bedrooms': p.bedrooms,
        'bathrooms': p.bathrooms,
        'area': p.area,
        'status': p.status,
        'agent_id': p.agent_id
    } for p in props])

@property_bp.route('/', methods=['POST'])
@jwt_required()
def create_property():
    data = request.json
    user_id = int(get_jwt_identity()) 

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
        agent_id=user_id  
    )
    db.session.add(property)
    db.session.commit()
    return jsonify({'message': 'Property created successfully'}), 201
