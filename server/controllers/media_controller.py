from flask import Blueprint, request, jsonify
from models.property_media import PropertyMedia, db
from flask_jwt_extended import jwt_required, get_jwt_identity


media_bp = Blueprint('media', __name__, url_prefix='/media')

@media_bp.route('/<int:property_id>', methods=['GET'])
def get_media(property_id):
    media = PropertyMedia.query.filter_by(property_id=property_id).all()
    return jsonify([{
        'id': m.id,
        'media_url': m.media_url,
        'media_type': m.media_type
    } for m in media])
    
@media_bp.route('/add', methods=['POST'])
@jwt_required()
def upload_media():
    data = request.json
    media = PropertyMedia(
        property_id=data['property_id'],
        media_url=data['media_url'],
        media_type=data['media_type']
    )
    db.session.add(media)
    db.session.commit()
    return jsonify({'message': 'Media uploaded'}), 201
