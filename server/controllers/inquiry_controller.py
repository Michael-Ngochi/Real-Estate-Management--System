from flask import Blueprint, request, jsonify
from models.inquiry import Inquiry, db
from models.user import User
from models.property import Property
from flask_jwt_extended import jwt_required, get_jwt_identity

inquiry_bp = Blueprint('inquiry', __name__, url_prefix='/inquiries')

@inquiry_bp.route('/', methods=['POST'])
@jwt_required()
def create_inquiry():
    data = request.json
    user_id = int(get_jwt_identity())
    inquiry = Inquiry(
        client_id=user_id,
        property_id=data['property_id'],
        message=data['message'],
        status='pending'
    )
    db.session.add(inquiry)
    db.session.commit()
    return jsonify({'message': 'Inquiry submitted'}), 201

@inquiry_bp.route('/my', methods=['GET'])
@jwt_required()
def my_inquiries():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if user.role == 'client':
        inquiries = Inquiry.query.filter_by(client_id=user_id).all()

    elif user.role == 'agent':
        inquiries = Inquiry.query.join(Property).filter(Property.agent_id == user_id).all()

    else:
        return jsonify({'error': 'Unauthorized role'}), 403

    return jsonify([
        {
            'id': i.id,
            'property_id': i.property_id,
            'message': i.message,
            'status': i.status,
            'created_at': i.created_at.isoformat(),
            'client_name': i.client.name if user.role == 'agent' else None,
            'property_title': i.property.title  # Optional extra
        }
        for i in inquiries
    ])
