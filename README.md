# LeadFlow CRM

A modern Full Stack Customer Relationship Management (CRM) application built using the MERN stack. LeadFlow CRM helps businesses manage client leads, monitor lead status, and streamline follow up activities through a clean and responsive dashboard.

---

## Features

### Authentication
- Secure Admin Login
- JWT-based Authentication (Backend Integration)
- Protected Routes
- Logout Functionality

### Dashboard
- Lead Statistics
- Quick Actions
- Recent Leads
- Responsive KPI Cards

### Lead Management
- Add Lead
- Edit Lead
- Delete Lead
- View Lead Details
- Search Leads
- Filter by Status

### Analytics
- Conversion Statistics
- Lead Sources
- Dashboard Metrics

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
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

---

## Project Structure

```
FUTURE_FS_02
│
├── client
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── data
│   │   ├── features
│   │   ├── hooks
│   │   ├── services
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
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/singhdevashish01/FUTURE_FS_02.git
```

### Install Frontend

```bash
cd client
npm install
npm run dev
```

### Install Backend

```bash
cd server
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

---

## API Endpoints

### Authentication

```
POST /api/auth/login
```

### Leads

```
GET    /api/leads

POST   /api/leads

PUT    /api/leads/:id

DELETE /api/leads/:id
```

---

## Current Status

- Frontend Completed
- Backend Structure Completed
- Authentication Structure Completed
- GitHub Repository Configured
- MongoDB Integration In Progress
- Deployment Pending

---

## Future Improvements

- Email Notifications
- Lead Assignment
- Role Based Access Control
- Dashboard Charts
- Export Leads to CSV
- Dark Mode
- Activity Timeline

---

## Author

**Devashish Singh**

Computer Science Engineering Undergraduate

GitHub:
https://github.com/singhdevashish01

LinkedIn:
https://www.linkedin.com/in/devashishsingh01

---

## Live Demo

Frontend:
https://leadflow-crm-devashish-da1lv8pk9-devashishsingh01.vercel.app

Backend:
https://leadflow-crm-backend-l4cd.onrender.com

---

## License

This project is licensed under the MIT License.