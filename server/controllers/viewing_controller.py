from flask import Blueprint, request, jsonify
from models.viewing_request import ViewingRequest, db
from models.user import User
from models.property import Property
from flask_jwt_extended import jwt_required, get_jwt_identity

viewing_bp = Blueprint('viewing', __name__, url_prefix='/viewings')

@viewing_bp.route('/', methods=['POST'])
@jwt_required()
def request_viewing():
    data = request.json
    user_id = int(get_jwt_identity())

    request_obj = ViewingRequest(
        client_id=user_id,
        property_id=data['property_id'],
        scheduled_at=data['scheduled_at'],
        status='pending',
        notes=data.get('notes')
    )
    db.session.add(request_obj)
    db.session.commit()
    return jsonify({'message': 'Viewing requested'}), 201

@viewing_bp.route('/my', methods=['GET'])
@jwt_required()
def my_viewings():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if user.role == 'client':
        # Client: get viewings they requested
        viewings = ViewingRequest.query.filter_by(client_id=user_id).all()

    elif user.role == 'agent':
        # Agent: get viewings scheduled for their listed properties
        viewings = ViewingRequest.query.join(Property).filter(Property.agent_id == user_id).all()

    else:
        return jsonify({'error': 'Unauthorized role'}), 403

    return jsonify([{
        'id': v.id,
        'property_id': v.property_id,
        'scheduled_at': v.scheduled_at.isoformat(),
        'status': v.status,
        'notes': v.notes
    } for v in viewings])

@viewing_bp.route('/<int:id>', methods=['PATCH'])
@jwt_required()
def update_viewing(id):
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    data = request.json

    viewing = ViewingRequest.query.get_or_404(id)
    property = Property.query.get(viewing.property_id)

    # Agent can only modify their own property's viewings
    if user.role == 'agent' and property.agent_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    # Allow status and time to be updated
    if 'status' in data:
        viewing.status = data['status']
    if 'scheduled_at' in data:
        viewing.scheduled_at = data['scheduled_at']
    if 'notes' in data:
        viewing.notes = data['notes']

    db.session.commit()
    return jsonify({'message': 'Viewing updated'}), 200
