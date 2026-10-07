# EventPulse — Full-Stack Event Management Application

A complete full-stack Event Management project built with **React (Vite)** on the frontend and **Node.js (Express)** on the backend.

---

## 📁 Project Structure

```text
event-management/
├── .env                        # Frontend environment variables (Vite)
├── .env.example                # Frontend environment template
├── .gitignore                  # Git ignore rules
├── index.html                  # Frontend entry HTML
├── package.json                # Root package configuration & run scripts
├── vite.config.js              # Vite configuration
│
├── src/                        # React Frontend Source Code
│   ├── components/             # React UI Components
│   │   ├── CreateEventModal.jsx# Host / Create Event modal
│   │   ├── EventCard.jsx       # Event card with RSVP & capacity bar
│   │   ├── Navbar.jsx          # Top navigation with live backend health monitor
│   │   └── StatsBanner.jsx     # Overview statistics & analytics
│   ├── services/
│   │   └── api.js              # API client connecting to backend using VITE_API_URL
│   ├── App.jsx                 # Main application dashboard (Tailwind CSS)
│   ├── index.css               # Tailwind CSS v4 imports & theme configuration
│   └── main.jsx                # React root mount
│
└── server/                     # Node.js Backend Source Code
    ├── .env                    # Backend environment variables (Express)
    ├── .env.example            # Backend environment template
    ├── package.json            # Server package configuration & scripts
    ├── index.js                # Express app entrypoint, CORS, routes & healthcheck
    ├── data/
    │   └── eventsData.js       # Seed events dataset
    └── routes/
        └── events.js           # REST API endpoints (GET, POST, DELETE, RSVP)
```

---

## ⚙️ Environment Variables

### 1. Frontend (`.env` in the root folder)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME="EventPulse Management"
VITE_APP_ENV=development
```

### 2. Backend (`server/.env` in the `server/` folder)
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

## 🚀 Getting Started

### 1. Install Dependencies

You can install all dependencies (both frontend and backend) with a single command from the root directory:

```bash
npm run install:all
```

Or manually:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

---

### 2. Running the Application

#### Option A: Run Both Frontend & Backend Simultaneously (Recommended)
From the root directory, run:
```bash
npm run dev
```
This runs both the **Vite React Dev Server** (`http://localhost:5173`) and the **Node.js Express Server** (`http://localhost:5000`) concurrently.

#### Option B: Run Individually

**Frontend only:**
```bash
npm run dev:client
```

**Backend only:**
```bash
npm run dev:server
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Backend status & health check |
| `GET` | `/api/events` | List all events (supports `?search=` and `?category=`) |
| `GET` | `/api/events/:id` | Get details of a single event |
| `POST` | `/api/events` | Create a new event |
| `POST` | `/api/events/:id/register` | RSVP / register attendee |
| `DELETE` | `/api/events/:id` | Remove an event |
