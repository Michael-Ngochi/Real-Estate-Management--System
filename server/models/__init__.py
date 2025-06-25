from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

from .user import User
from .property import Property
from .property_media import PropertyMedia
from .inquiry import Inquiry
from .viewing_request import ViewingRequest
from .application import Application
