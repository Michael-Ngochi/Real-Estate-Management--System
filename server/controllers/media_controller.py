from flask import Blueprint, request, jsonify
from models.property_media import PropertyMedia, db

media_bp = Blueprint('media', __name__, url_prefix='/media')

@media_bp.route('/<int:property_id>', methods=['GET'])
def get_media(property_id):
    media = PropertyMedia.query.filter_by(property_id=property_id).all()
    return jsonify([{
        'id': m.id,
        'media_url': m.media_url,
        'media_type': m.media_type
    } for m in media])