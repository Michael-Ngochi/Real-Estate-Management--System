from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from models.user import db, bcrypt
from config import Config
from models import db, bcrypt
from flask_cors import CORS

import models
from models.property import Property
from models.property_media import PropertyMedia
from models.inquiry import Inquiry
from models.viewing_request import ViewingRequest
from models.application import Application


from controllers.auth_controller import auth_bp
from controllers.property_controller import property_bp
from controllers.media_controller import media_bp
from controllers.inquiry_controller import inquiry_bp
from controllers.viewing_controller import viewing_bp
from controllers.application_controller import application_bp

def create_app():
    
    app = Flask(__name__)
    
    app.config.from_object(Config)

    CORS(app, resources={r"/*": {"origins": [
    "http://localhost:5173",
    "https://real-estate-management-system-bycp.onrender.com"
     ]}}, supports_credentials=True)
    
    
    db.init_app(app)
    bcrypt.init_app(app)
    jwt = JWTManager(app)
    migrate = Migrate(app, db)

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(property_bp)
    app.register_blueprint(media_bp)
    app.register_blueprint(inquiry_bp)
    app.register_blueprint(viewing_bp)
    app.register_blueprint(application_bp)
    
    @app.route("/run-seed2")
    def run_seed2():
        try:
            import seed2 
            return {"message": "✅ seed_extra.py executed successfully"}
        except Exception as e:
            return {"error": str(e)}, 500

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
    
app = create_app()