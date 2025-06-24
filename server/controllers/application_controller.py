from flask import Blueprint, request, jsonify
from models.application import Application, db
from flask_jwt_extended import jwt_required, get_jwt_identity

application_bp = Blueprint('application', __name__, url_prefix='/applications')

@application_bp.route('/', methods=['POST'])
@jwt_required()
def submit_application():
    data = request.json
    identity = get_jwt_identity()
    application = Application(
        client_id=identity['id'],
        property_id=data['property_id'],
        application_type=data['application_type'],
        message=data['message'],
        status='submitted'
    )
    db.session.add(application)
    db.session.commit()
    return jsonify({'message': 'Application submitted'}), 201