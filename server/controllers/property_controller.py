from flask import Blueprint, request, jsonify
from models.property import Property, db
from flask_jwt_extended import jwt_required, get_jwt_identity

property_bp = Blueprint('property', __name__, url_prefix='/properties')

from models.property_media import PropertyMedia

@property_bp.route('/', methods=['GET'])
def list_properties():
    query = Property.query

    # Filters
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
        'agent_id': p.agent_id,
        'image_url': (PropertyMedia.query.filter_by(property_id=p.id).first().media_url
                      if PropertyMedia.query.filter_by(property_id=p.id).first() else None)
    } for p in properties])



@property_bp.route("/counties", methods=["GET"])
def get_counties():
    counties = db.session.query(Property.county).distinct().all()
    return jsonify([c[0] for c in counties])



@property_bp.route('/<int:id>', methods=['GET'])
def get_property(id):
    prop = Property.query.get_or_404(id)
    agent = prop.agent  # Requires Property.agent relationship
    image = PropertyMedia.query.filter_by(property_id=prop.id).first()

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
        'agent_id': prop.agent_id,
        'image_url': image.media_url if image else None,
        'agent': {
            'id': agent.id,
            'name': agent.name,
            'email': agent.email,
            'phone': agent.phone
        } if agent else None
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
        county=data.get('county'),
        town=data.get('town'),
        geo_coordinates=data.get('geo_coordinates'),
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

    return jsonify({
        'message': 'Property created successfully',
        'id': property.id,
        'title': property.title,
        'location': property.location,
        'agent_id': property.agent_id
    }), 201
    
    
    
@property_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_property(id):
    data = request.json
    user_id = int(get_jwt_identity())
    prop = Property.query.get_or_404(id)

    if prop.agent_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    # Update fields
    for field in [
        'title', 'description', 'location', 'county', 'town',
        'geo_coordinates', 'price', 'property_type',
        'bedrooms', 'bathrooms', 'area', 'status'
    ]:
        if field in data:
            setattr(prop, field, data[field])

    db.session.commit()

    # Update or create image if image_url is present
    if 'image_url' in data:
        from models.property_media import PropertyMedia

        existing_media = PropertyMedia.query.filter_by(property_id=id, media_type='image').first()
        if existing_media:
            existing_media.media_url = data['image_url']
        else:
            new_media = PropertyMedia(
                property_id=id,
                media_url=data['image_url'],
                media_type='image'
            )
            db.session.add(new_media)
        db.session.commit()

    return jsonify({'message': 'Property updated successfully'}), 200


@property_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_property(id):
    user_id = int(get_jwt_identity())
    prop = Property.query.get_or_404(id)

    if prop.agent_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    from models.property_media import PropertyMedia
    PropertyMedia.query.filter_by(property_id=prop.id).delete()

    db.session.delete(prop)
    db.session.commit()
    return jsonify({'message': 'Property deleted successfully'}), 200
