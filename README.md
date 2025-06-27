# NyumbaSmart – Full Stack Real Estate Platform

NyumbaSmart is a full-featured real estate web application built for the Kenyan market. It enables clients to browse and apply for properties, while agents manage listings, media, inquiries, and more.

---

## Tech Stack

| Layer        | Tech                            |
|--------------|----------------------------------|
| Frontend     | React + Bootstrap               |
| State Mgmt   | Zustand                         |
| Backend      | Flask + SQLAlchemy              |
| Auth         | JWT (via Flask-JWT-Extended)    |
| DB           | PostgreSQL                      |
| Deployment   | Render                          |

---

## Features

###  Clients
- Register and login
- Browse properties with filters
- Submit inquiries, applications, and viewing requests

###  Agents
- Create, edit, and delete their listings
- Upload and update property images
- Manage client interactions

###  Admin (future expansion)
- Manage users and listings

---

##  Test Accounts

###  Agent Accounts
- **Email**: wanjiku@agency.co.ke  
  **Password**: `agentpass`
- **Email**: otieno@agency.co.ke  
  **Password**: `agentpass`

###  Client Accounts
- **Email**: brian@client.co.ke  
  **Password**: `clientpass`
- **Email**: amina@client.co.ke  
  **Password**: `clientpass`

###  Admin Account
- **Email**: admin@nyumbasmart.co.ke  
  **Password**: `adminpass`

---

## 📄 API Overview (Backend)
| Name                   | Method                             | Path                   | Auth                            | Description                              |
| ---------------------- | ---------------------------------- | ---------------------- | ------------------------------- | ---------------------------------------- |
| Register               | POST                               | `/auth/register`       | ❌                               | Create new user account                  |
| Login                  | POST                               | `/auth/login`          | ❌                               | Authenticate user and return JWT         |
| Me                     | GET                                | `/auth/me`             | ✅                               | Fetch currently logged-in user's profile |
| List Properties        | GET                                | `/properties`          | ❌                               | Browse and filter properties             |
| Get Property           | GET                                | `/properties/<id>`     | ❌                               | View details of a single property        |
| My Properties          | GET                                | `/properties/my`       | ✅                               | Agent fetches their own listings         |
| Add Property           | POST                               | `/properties`          | ✅                               | Agent adds new property listing          |
| Edit Property          | PUT                                | `/properties/<id>`     | ✅                               | Agent edits own property listing         |
| Delete Property        | DELETE                             | `/properties/<id>`     | ✅                               | Agent deletes own listing                |
| Get Counties           | GET                                | `/properties/counties` | ❌                               | List unique counties for filters         |
| Upload or Update Image | Included in PUT                    |`/properties/<id>`       | ✅                               | Replaces image for the property          |
| Send Inquiry           | POST                               | `/inquiries`           | ✅                               | Client sends inquiry for property        |
| My Inquiries           | GET                                | `/inquiries/my`        | ✅                               | View inquiries by client or to agent     |
| Book Viewing           | POST                               | `/viewings`            | ✅                               | Client schedules property viewing        |
| My Viewings            | GET                                | `/viewings/my`         | ✅                               | View client's viewings or agent's ones   |
| Update Viewing         | PATCH                              | `/viewings/<id>`       | ✅                               | Agent updates viewing status/time        |
| Submit Application     | POST                               | `/applications`        | ✅                               | Client submits rental/purchase request   |
| My Applications        | GET                                | `/applications/my`     | ✅                               | View applications (by client or agent)   |
| Update Application     | PATCH                              | `/applications/<id>`   | ✅                               | Agent updates application status         |


Use the Postman collection `nyumbasmart.postman_collection.json` to test endpoints.

---

## 🧬 Seeding Data

To seed demo accounts and listings:

```bash
GET http://localhost:5000/run-seed
GET http://localhost:5000/run-seed2
```

---

##  Running the App

### Backend

```bash
cd server
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🌐 Deployment

- **Frontend**: Deployed on [Render](https://render.com) using Vite  
  → URL: `https://real-estate-management-system-bycp.onrender.com/`

- **Backend**: Flask API hosted on Render  
  → URL: `https://nyumbasmart.onrender.com`

- **Database**: PostgreSQL (connected via Render’s managed services)



Ensure CORS is enabled for both local and production URLs.

---


---

© 2025 NyumbaSmart. All rights reserved.
