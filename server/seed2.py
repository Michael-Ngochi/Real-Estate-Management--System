from datetime import datetime, timedelta
from models.user import User, db
from models.property import Property
from models.property_media import PropertyMedia
from models.inquiry import Inquiry
from models.viewing_request import ViewingRequest
from models.application import Application
from app import create_app

app = create_app()

def create_user_if_not_exists(name, email, role, phone, password):
    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(name=name, email=email, role=role, phone=phone)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
    return user

with app.app_context():
    admin1 = create_user_if_not_exists("Admin Two", "admin2@nyumbasmart.co.ke", "admin", "+254712349999", "adminpass")
    admin2 = create_user_if_not_exists("Admin Three", "admin3@nyumbasmart.co.ke", "admin", "+254712341111", "adminpass")
    agent1 = create_user_if_not_exists("Jane Wairimu", "jane@agency.co.ke", "agent", "+254722333111", "agentpass")
    agent2 = create_user_if_not_exists("David Kamau", "kamau@agency.co.ke", "agent", "+254723221100", "agentpass")
    client1 = create_user_if_not_exists("Kevin Omondi", "kevin@client.co.ke", "client", "+254711221234", "clientpass")
    client2 = create_user_if_not_exists("Lydia Chebet", "lydia@client.co.ke", "client", "+254798321456", "clientpass")

    # --- Properties and Media ---
    if not Property.query.filter_by(title="Studio Apartment in Ruaka").first():
        prop_extra1 = Property(
            title="Studio Apartment in Ruaka",
            description="Compact and modern studio perfect for singles or students.",
            location="Ruaka Road",
            county="Kiambu",
            town="Ruaka",
            geo_coordinates="-1.2117,36.7921",
            price=3500000,
            property_type="studio",
            bedrooms=1,
            bathrooms=1,
            area=45.0,
            status="available",
            agent_id=agent1.id
        )
        db.session.add(prop_extra1)
        db.session.commit()
        db.session.add(PropertyMedia(property_id=prop_extra1.id, media_url="https://images.unsplash.com/photo-1580587771525-78b9dba3b914", media_type="image"))
        db.session.commit()
    if not Property.query.filter_by(title="2 Bedroom Apartment in Syokimau").first():
        prop_extra2 = Property(
            title="2 Bedroom Apartment in Syokimau",
            description="Secure apartment with ample parking space and playground.",
            location="Katani Road",
            county="Machakos",
            town="Syokimau",
            geo_coordinates="-1.3541,36.9460",
            price=6200000,
            property_type="apartment",
            bedrooms=2,
            bathrooms=2,
            area=85.0,
            status="available",
            agent_id=agent2.id
        )
        db.session.add(prop_extra2)
        db.session.commit()
        db.session.add(PropertyMedia(property_id=prop_extra2.id, media_url="https://images.unsplash.com/photo-1586105251261-72a756497a12", media_type="image"))
        db.session.commit()
    if not Property.query.filter_by(title="3 Bedroom Maisonette in Utawala").first():
        prop_extra3 = Property(
            title="3 Bedroom Maisonette in Utawala",
            description="Spacious maisonette ideal for families, with a backyard.",
            location="Eastern Bypass",
            county="Nairobi",
            town="Utawala",
            geo_coordinates="-1.2790,36.9763",
            price=9500000,
            property_type="house",
            bedrooms=3,
            bathrooms=2,
            area=130.0,
            status="available",
            agent_id=agent1.id
        )
        db.session.add(prop_extra3)
        db.session.commit()
        db.session.add(PropertyMedia(property_id=prop_extra3.id, media_url="https://images.unsplash.com/photo-1600585154154-10579c2f511b", media_type="image"))
        db.session.commit()
    if not Property.query.filter_by(title="Commercial Shop Space in Donholm").first():
        prop_extra4 = Property(
            title="Commercial Shop Space in Donholm",
            description="Affordable shop space suitable for retail or services.",
            location="Donholm Phase 5",
            county="Nairobi",
            town="Donholm",
            geo_coordinates="-1.2962,36.8963",
            price=2800000,
            property_type="shop",
            bedrooms=0,
            bathrooms=1,
            area=60.0,
            status="available",
            agent_id=agent2.id
        )
        db.session.add(prop_extra4)
        db.session.commit()
        db.session.add(PropertyMedia(property_id=prop_extra4.id, media_url="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2", media_type="image"))
        db.session.commit()
    if not Property.query.filter_by(title="50x100 Plot in Juja Farm").first():
        prop_extra5 = Property(
            title="50x100 Plot in Juja Farm",
            description="Well-positioned plot with access to water and electricity.",
            location="Juja Farm Road",
            county="Kiambu",
            town="Juja Farm",
            geo_coordinates="-1.0932,37.0123",
            price=1250000,
            property_type="land",
            bedrooms=0,
            bathrooms=0,
            area=500.0,
            status="available",
            agent_id=agent1.id
        )
        db.session.add(prop_extra5)
        db.session.commit()
        db.session.add(PropertyMedia(property_id=prop_extra5.id, media_url="https://images.unsplash.com/photo-1599427303058-f04cbcf4756f", media_type="image"))
        db.session.commit()

    # --- Inquiries, Viewings, Applications ---
    if prop_1 := Property.query.filter_by(title="Studio Apartment in Ruaka").first():
        if not Inquiry.query.filter_by(client_id=client1.id, property_id=prop_1.id).first():
            db.session.add(Inquiry(client_id=client1.id, property_id=prop_1.id, message="Is this still available?", status="pending"))
            db.session.commit()
        if not ViewingRequest.query.filter_by(client_id=client1.id, property_id=prop_1.id).first():
            db.session.add(ViewingRequest(client_id=client1.id, property_id=prop_1.id, scheduled_at=datetime.utcnow() + timedelta(days=3), status="pending", notes="Afternoon preferred"))
            db.session.commit()
        if not Application.query.filter_by(client_id=client1.id, property_id=prop_1.id).first():
            db.session.add(Application(client_id=client1.id, property_id=prop_1.id, application_type="rental", message="Interested in this property.", status="submitted"))
            db.session.commit()
    if prop_2 := Property.query.filter_by(title="2 Bedroom Apartment in Syokimau").first():
        if not Inquiry.query.filter_by(client_id=client2.id, property_id=prop_2.id).first():
            db.session.add(Inquiry(client_id=client2.id, property_id=prop_2.id, message="Is this still available?", status="pending"))
            db.session.commit()
        if not ViewingRequest.query.filter_by(client_id=client2.id, property_id=prop_2.id).first():
            db.session.add(ViewingRequest(client_id=client2.id, property_id=prop_2.id, scheduled_at=datetime.utcnow() + timedelta(days=3), status="pending", notes="Afternoon preferred"))
            db.session.commit()
        if not Application.query.filter_by(client_id=client2.id, property_id=prop_2.id).first():
            db.session.add(Application(client_id=client2.id, property_id=prop_2.id, application_type="rental", message="Interested in this property.", status="submitted"))
            db.session.commit()
    if prop_3 := Property.query.filter_by(title="3 Bedroom Maisonette in Utawala").first():
        if not Inquiry.query.filter_by(client_id=client1.id, property_id=prop_3.id).first():
            db.session.add(Inquiry(client_id=client1.id, property_id=prop_3.id, message="Is this still available?", status="pending"))
            db.session.commit()
        if not ViewingRequest.query.filter_by(client_id=client1.id, property_id=prop_3.id).first():
            db.session.add(ViewingRequest(client_id=client1.id, property_id=prop_3.id, scheduled_at=datetime.utcnow() + timedelta(days=3), status="pending", notes="Afternoon preferred"))
            db.session.commit()
        if not Application.query.filter_by(client_id=client1.id, property_id=prop_3.id).first():
            db.session.add(Application(client_id=client1.id, property_id=prop_3.id, application_type="rental", message="Interested in this property.", status="submitted"))
            db.session.commit()
    if prop_4 := Property.query.filter_by(title="Commercial Shop Space in Donholm").first():
        if not Inquiry.query.filter_by(client_id=client2.id, property_id=prop_4.id).first():
            db.session.add(Inquiry(client_id=client2.id, property_id=prop_4.id, message="Is this still available?", status="pending"))
            db.session.commit()
        if not ViewingRequest.query.filter_by(client_id=client2.id, property_id=prop_4.id).first():
            db.session.add(ViewingRequest(client_id=client2.id, property_id=prop_4.id, scheduled_at=datetime.utcnow() + timedelta(days=3), status="pending", notes="Afternoon preferred"))
            db.session.commit()
        if not Application.query.filter_by(client_id=client2.id, property_id=prop_4.id).first():
            db.session.add(Application(client_id=client2.id, property_id=prop_4.id, application_type="rental", message="Interested in this property.", status="submitted"))
            db.session.commit()
    if prop_5 := Property.query.filter_by(title="50x100 Plot in Juja Farm").first():
        if not Inquiry.query.filter_by(client_id=client1.id, property_id=prop_5.id).first():
            db.session.add(Inquiry(client_id=client1.id, property_id=prop_5.id, message="Is this still available?", status="pending"))
            db.session.commit()
        if not ViewingRequest.query.filter_by(client_id=client1.id, property_id=prop_5.id).first():
            db.session.add(ViewingRequest(client_id=client1.id, property_id=prop_5.id, scheduled_at=datetime.utcnow() + timedelta(days=3), status="pending", notes="Afternoon preferred"))
            db.session.commit()
        if not Application.query.filter_by(client_id=client1.id, property_id=prop_5.id).first():
            db.session.add(Application(client_id=client1.id, property_id=prop_5.id, application_type="rental", message="Interested in this property.", status="submitted"))
            db.session.commit()

    print("Extra seed data inserted successfully.")