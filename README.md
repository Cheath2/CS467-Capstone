# Job Tracker API (Backend)

A minimal backend server for tracking job applications.

## Prerequisites

- Node.js v16+ and npm
- MongoDB URI (Atlas or local)

## Quick Start

1. **Clone & Configure**
   ```bash
   git clone <repo-url>
   cp .env.example .env
   # Edit .env with your values
   ```
2. **Install Dependencies**
   ```bash
   npm ci
   ```
3. **Run Server**
   ```bash
   npm run start:server
   ```
4. **Verify**
   ```bash
   curl http://localhost:5000/
   # => ✅ Job Tracker API is up and running
   ```

## Scripts

- `start:server` — start the API
- `dev:server` — start with nodemon (if defined)
- `lint` — lint server code

## Environment Variables

| Variable    | Description                  |
|-------------|------------------------------|
| `PORT`      | Server port (default: 5000)  |
| `MONGO_URI` | MongoDB connection string    |
| `JWT_SECRET`| JWT signing secret           |

## CI Integration

GitHub Actions automates:
- `npm ci`
- `npm run lint`

*Keep it simple and code!*

