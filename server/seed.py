from datetime import datetime, timedelta
from models.user import User, db, bcrypt
from models.property import Property
from models.property_media import PropertyMedia
from models.inquiry import Inquiry
from models.viewing_request import ViewingRequest
from models.application import Application
from app import create_app

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    # --- Create Users ---
    admin = User(name="Admin One", email="admin@nyumbasmart.co.ke", role="admin", phone="+254712345678")
    admin.set_password("adminpass")

    agent1 = User(name="Wanjiku Mwangi", email="wanjiku@agency.co.ke", role="agent", phone="+254722111000")
    agent1.set_password("agentpass")

    agent2 = User(name="Otieno Owino", email="otieno@agency.co.ke", role="agent", phone="+254711999888")
    agent2.set_password("agentpass")

    client1 = User(name="Brian Kipkoech", email="brian@client.co.ke", role="client", phone="+254700111222")
    client1.set_password("clientpass")

    client2 = User(name="Amina Noor", email="amina@client.co.ke", role="client", phone="+254799887766")
    client2.set_password("clientpass")

    db.session.add_all([admin, agent1, agent2, client1, client2])
    db.session.commit()

    # --- Create Properties ---
    prop1 = Property(
        title="3 Bedroom Apartment in Kilimani",
        description="Spacious apartment with parking and security.",
        location="Menelik Road",
        county="Nairobi",
        town="Kilimani",
        geo_coordinates="-1.3008,36.7845",
        price=9500000,
        property_type="apartment",
        bedrooms=3,
        bathrooms=2,
        area=120.5,
        status="available",
        agent_id=agent1.id
    )

    prop2 = Property(
        title="Serviced Plot in Riat Hills",
        description="50x100 plot with access road and water.",
        location="Riat Access Road",
        county="Kisumu",
        town="Riat Hills",
        geo_coordinates="-0.0987,34.7593",
        price=1250000,
        property_type="land",
        bedrooms=0,
        bathrooms=0,
        area=500.0,
        status="available",
        agent_id=agent2.id
    )

    db.session.add_all([prop1, prop2])
    db.session.commit()

    # --- Add Media ---
    media1 = PropertyMedia(property_id=prop1.id, media_url="https://example.com/kilimani1.jpg", media_type="image")
    media2 = PropertyMedia(property_id=prop2.id, media_url="https://example.com/riatplot.jpg", media_type="image")
    db.session.add_all([media1, media2])
    db.session.commit()

    # --- Create Inquiries ---
    inquiry1 = Inquiry(client_id=client1.id, property_id=prop1.id, message="Is this still available?", status="pending")
    inquiry2 = Inquiry(client_id=client2.id, property_id=prop2.id, message="Any discount for cash buyers?", status="pending")
    db.session.add_all([inquiry1, inquiry2])
    db.session.commit()

    # --- Viewing Requests ---
    viewing1 = ViewingRequest(
        client_id=client1.id,
        property_id=prop1.id,
        scheduled_at=datetime.utcnow() + timedelta(days=2),
        status="pending",
        notes="Prefer morning hours."
    )
    db.session.add(viewing1)
    db.session.commit()

    # --- Applications ---
    app1 = Application(
        client_id=client1.id,
        property_id=prop1.id,
        application_type="purchase",
        message="Ready to buy. Please advise next steps.",
        status="submitted"
    )
    db.session.add(app1)
    db.session.commit()

    print("Seed data inserted successfully.")