# LeadFlow CRM

A modern full-stack CRM platform built to manage leads, track sales pipelines, monitor follow-ups, and analyze business performance through a centralized dashboard.

Developed as part of the Future Intern Full Stack Development Program and extended into a portfolio-grade MERN application.

---

## Features

### Authentication
- JWT Authentication
- Protected Routes
- Secure Login Flow

### Dashboard
- Total Leads Overview
- Pipeline Value Tracking
- Conversion Metrics
- High Priority Lead Monitoring
- Recent Leads Section
- Upcoming Follow-ups

### Lead Management
- Create Leads
- Edit Leads
- Delete Leads
- Advanced Lead Details Workspace
- Search and Filter Leads
- CSV Export

### Pipeline Management
- Kanban Style Pipeline
- Drag and Drop Lead Movement
- Multi-stage Sales Workflow

### Analytics
- Lead Source Analytics
- Conversion Rate Tracking
- Pipeline Value Analysis
- Status Distribution Charts

### Follow-up Management
- Upcoming Follow-ups
- Overdue Follow-ups
- Follow-up Status Indicators

### Productivity Features
- Global Search
- Notification Center
- Activity Timeline
- Notes History
- Quick Actions

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- Recharts
- DnD Kit
- Lucide React
- React Toastify
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

---

## Sales Pipeline Stages

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
client/
├── components/
├── constants/
├── features/
├── hooks/
├── services/
├── utils/

server/
├── controllers/
├── middleware/
├── models/
├── routes/
├── config/
```

---

## Environment Variables

### Server

Create:

```env
server/.env
```

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Client

Create:

```env
client/.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/singhdevashish01/FUTURE_FS_02.git
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

---

## Future Improvements

- Role Based Access Control
- Dark Mode
- Email Integration
- File Attachments
- Team Collaboration
- Audit Logs

---

## Author

**Devashish Singh**

Computer Science Engineering Undergraduate

- GitHub: https://github.com/singhdevashish01
- LinkedIn: Add your LinkedIn profile link
- Portfolio: Add your portfolio link

---

## License

This project is developed for educational and portfolio purposes.