# Restaurant Table Reservation System

IFN636 Assessment 1 — Software Life Cycle Management

## Overview
A web application allowing customers to browse and book restaurant tables (with double-booking prevention), and admins to manage table inventory with role-based access control.

## Tech Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT authentication, bcrypt password hashing
- Frontend: React, React Router, Axios
- Deployment: AWS EC2 (Ubuntu)

## Setup
1. Clone the repository
2. Backend: `cd backend && npm install`
3. Create a `.env` file in `backend/` with `MONGO_URI`, `JWT_SECRET`, `PORT`
4. Run backend: `node server.js`
5. Frontend: `cd frontend && npm install && npm start`

## Deployment
- Live URL: http://3.106.236.129:3000
- Backend API: http://3.106.236.129:5001
- EC2 Instance ID: i-094bb2293b43aa9ee

## Known Limitations
- Frontend has no visual navigation bar; admin routes accessed via direct URL
- No email/SMS notifications
- Single restaurant only (no multi-location support)
- Update/Cancel reservation and full admin reservation oversight (view/approve/reject) were scoped out of this iteration given time constraints; only table creation was implemented for admin management

## GenAI Disclosure
GenAI (Claude) was used for guidance, code review, and debugging assistance during development. All code was reviewed and understood by the developer before inclusion.