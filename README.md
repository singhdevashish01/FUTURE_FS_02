# LeadFlow CRM

A modern Full Stack Customer Relationship Management (CRM) application built using the MERN stack. LeadFlow CRM helps businesses manage leads, monitor sales progress, track follow-ups, and analyze pipeline performance through a centralized dashboard.

Developed as part of the **Future Intern Full Stack Development Program** and later extended into a portfolio grade CRM platform.

---

## Live Demo

Frontend https://leadflow-crm-devashish.vercel.app 
Backend API https://leadflow-crm-backend-l4cd.onrender.com 

---

## Features

### Authentication
- Secure Admin Login
- JWT Authentication
- Protected Routes
- Logout Functionality

### Dashboard
- Lead Statistics
- KPI Metrics
- Quick Actions
- Recent Leads
- Upcoming Follow-ups
- Responsive Dashboard Cards

### Lead Management
- Add Lead
- Edit Lead
- Delete Lead
- View Detailed Lead Profiles
- Search Leads
- Filter Leads by Status
- CSV Export

### Sales Pipeline
- Kanban style Pipeline View
- Drag and Drop Lead Movement
- Multi stage Sales Workflow

### Analytics
- Conversion Statistics
- Lead Source Distribution
- Pipeline Value Tracking
- Dashboard Metrics
- Charts and Visualizations

### Follow-ups
- Upcoming Follow-ups
- Overdue Follow-ups
- Follow-up Status Tracking

### Productivity Features
- Global Search
- Notification Center
- Activity Timeline
- Notes History
- Quick Actions

### Settings
- Admin Profile
- CRM Preferences

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- DnD Kit
- React Toastify
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

---

## Sales Pipeline Workflow

```text
New
→ Contacted
→ Qualified
→ Proposal Sent
→ Negotiation
→ Won
→ Lost
```

---

## Project Structure

```text
FUTURE_FS_02
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── constants
│   │   ├── features
│   │   ├── hooks
│   │   ├── services
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── public
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
├── .gitignore
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/singhdevashish01/FUTURE_FS_02.git
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

---

## Environment Variables

### Server

Create:

```text
server/.env
```

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Client

Create:

```text
client/.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Endpoints

### Authentication

```text
POST /api/auth/login
```

### Leads

```text
GET    /api/leads
POST   /api/leads
PUT    /api/leads/:id
DELETE /api/leads/:id
```

---

## Current Status

- Frontend Completed
- Backend Completed
- MongoDB Atlas Integrated
- Authentication Implemented
- Deployment Completed
- Production Ready

---

## Future Improvements

- Role Based Access Control
- Email Integration
- File Attachments
- Team Collaboration
- Audit Logs
- Dark Mode

---

## Author

**Devashish Singh**

Computer Science Engineering Undergraduate

GitHub:
https://github.com/singhdevashish01

LinkedIn:
https://www.linkedin.com/in/devashishsingh01

Portfolio:
https://devashish-portfolio-pi.vercel.app

---

## License

This project is licensed under the MIT License.