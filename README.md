# growrich-e-learning

## Overview
Growrich E-Learning is a full‑stack platform for delivering learning packs and general video content. It uses an Express backend with a React client and integrates with Google for authentication.

## Installation
1. Change into the application directory
   ```bash
   cd SawadeeBot
   ```
2. Install dependencies
   ```bash
   npm install
   ```

## Running
- **Development**
  ```bash
  npm run dev
  ```
- **Production**
  ```bash
  npm run build
  npm start
  ```

## Environment Variables
Create a `.env` file or set the following variables:
- `DATABASE_URL` – PostgreSQL connection string
- `SESSION_SECRET` – secret for Express session cookies
- `PORT` – port to listen on (default `5000`)
- `GOOGLE_CLIENT_ID` – Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` – Google OAuth client secret
- `GOOGLE_CALLBACK_URL` – callback URL for Google OAuth (default `/api/google/callback`)

## Testing the API
After the server is running and you have an authenticated session, you can test endpoints such as:
```bash
curl -H "Cookie: connect.sid=<session>" http://localhost:5000/api/learning-packs
```
This fetches available learning packs for the logged‑in user.
