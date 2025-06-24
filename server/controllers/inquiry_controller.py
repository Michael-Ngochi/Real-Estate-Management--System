from flask import Blueprint, request, jsonify
from models.inquiry import Inquiry, db
from flask_jwt_extended import jwt_required, get_jwt_identity

inquiry_bp = Blueprint('inquiry', __name__, url_prefix='/inquiries')

@inquiry_bp.route('/', methods=['POST'])
@jwt_required()
def create_inquiry():
    data = request.json
    identity = get_jwt_identity()
    inquiry = Inquiry(
        client_id=identity['id'],
        property_id=data['property_id'],
        message=data['message'],
        status='pending'
    )
    db.session.add(inquiry)
    db.session.commit()
    return jsonify({'message': 'Inquiry submitted'}), 201