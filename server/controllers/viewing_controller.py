from flask import Blueprint, request, jsonify
from models.viewing_request import ViewingRequest, db
from flask_jwt_extended import jwt_required, get_jwt_identity

viewing_bp = Blueprint('viewing', __name__, url_prefix='/viewings')

@viewing_bp.route('/', methods=['POST'])
@jwt_required()
def request_viewing():
    data = request.json
    identity = get_jwt_identity()
    request_obj = ViewingRequest(
        client_id=identity['id'],
        property_id=data['property_id'],
        scheduled_at=data['scheduled_at'],
        status='pending',
        notes=data.get('notes')
    )
    db.session.add(request_obj)
    db.session.commit()
    return jsonify({'message': 'Viewing requested'}), 201