# NyumbaSmart – Modern Real Estate Management for Kenya

> “What if finding a home in Kenya was as simple as scrolling through your phone?”

**Team:** 4 members  
**Stack:** Flask + React  
**Timeline:** 4 weeks  
**Status:** MVP Complete

---

## Problem & Vision

### The Problem
- Disconnected property platforms
- Manual inquiries, approvals, and bookings
- No centralized system for agents, clients, and admins

### Our Vision
To create an intuitive and secure real estate platform tailored to the Kenyan market, enabling seamless interaction between buyers, renters, agents, and administrators.

---

## Technologies Used

**Frontend**
- React + Vite
- Zustand (global state management)
- TailwindCSS, React Router

**Backend**
- Flask with SQLAlchemy
- PostgreSQL
- JWT Authentication
- Flask-Migrate, CORS

**Tooling & Deployment**
- Postman (API testing)
- GitHub (version control)
- Render (deployment)

---

## Sprint Progress Overview

- **Sprint 1:** Project setup, authentication, database schema
- **Sprint 2:** User flows, property CRUD, inquiry and viewing endpoints
- **Sprint 3:** Agent and client dashboards, admin UI setup
- **Sprint 4:** Frontend-backend integration, Zustand store, testing, MVP notification logic

---

## Team Contributions

| Member   | Area         | Key Tasks                                                      |
|----------|--------------|---------------------------------------------------------------|
| Michael  | Backend + PM | Auth APIs, basic notifications, reviews, merge management      |
| Joseph   | Backend      | Property/inquiry APIs, migrations, admin-side endpoints        |
| Natasha  | Frontend     | Home page, property filters, client dashboard features         |
| Ayub     | Frontend     | Agent/Admin dashboards, API integration, Zustand setup         |

---

## Features Summary

**Completed**
- Secure login system with role-based access
- Property listing with media support
- Inquiries and viewing requests
- Agent dashboard to manage listings and messages
- Zustand global state across components
- Integrated backend-frontend workflows

**Not Yet Completed**
- Admin-side management tools
- Persistent notification system
- Map/location-based browsing
- OTP authentication

---

## Challenges Faced

| Area                | Solution                                                        |
|---------------------|-----------------------------------------------------------------|
| Auth & token sync   | JWT + Zustand with localStorage for state persistence           |
| State management    | Zustand enabled shared state without prop drilling              |
| Conditional routing | Role-based rendering and navigation guards                      |
| Time constraints    | Focused on stable MVP, deferred advanced features               |
| UI validation       | Custom form handling instead of external libraries (e.g., Formik)|

---

## Future Plans

- Admin tools: approvals, role control, dashboard analytics
- Map integration (Google Maps/Mapbox)
- Notification system with real-time alerts and messaging
- OTP-based login and 2FA security
- Responsive mobile-first UI
- SMS and email communication for inquiries and status updates

---

NyumbaSmart is ready to scale from MVP to a comprehensive national platform.