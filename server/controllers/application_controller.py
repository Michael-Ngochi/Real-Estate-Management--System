from flask import Blueprint, request, jsonify
from models.application import Application, db
from flask_jwt_extended import jwt_required, get_jwt_identity

application_bp = Blueprint('application', __name__, url_prefix='/applications')

@application_bp.route('/', methods=['POST'])
@jwt_required()
def submit_application():
    data = request.json
    user_id = int(get_jwt_identity())
    application = Application(
        client_id=user_id,
        property_id=data['property_id'],
        application_type=data['application_type'],
        message=data['message'],
        status='submitted'
    )
    db.session.add(application)
    db.session.commit()
    return jsonify({'message': 'Application submitted'}), 201


@application_bp.route('/my', methods=['GET'])
@jwt_required()
def get_my_applications():
    user_id = int(get_jwt_identity())
    applications = Application.query.filter_by(client_id=user_id).all()
    return jsonify([{
        'id': app.id,
        'property_id': app.property_id,
        'application_type': app.application_type,
        'message': app.message,
        'status': app.status,
        'created_at': app.created_at.isoformat()
    } for app in applications])
