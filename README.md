# growrich-e-learning

## Overview
Growrich E-Learning is a full‑stack platform for delivering learning packs and general video content. It uses an Express backend with a React client and integrates with Replit for authentication.

## Installation
Install dependencies from the repository root (this installs the application located in `SawadeeBot`):
```bash
npm install
```
You can still run `cd SawadeeBot && npm install` if you prefer to work from that directory.

## Running
From the repository root:
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
- `REPLIT_DOMAINS` – comma‑separated list of allowed domains
- `REPL_ID` – Replit application ID
- `SESSION_SECRET` – secret for Express session cookies
- `ISSUER_URL` – OIDC issuer URL (optional, defaults to `https://replit.com/oidc`)
- `PORT` – port to listen on (default `5000`)

## Testing the API
After the server is running and you have an authenticated session, you can test endpoints such as:
```bash
curl -H "Cookie: connect.sid=<session>" http://localhost:5000/api/learning-packs
```
This fetches available learning packs for the logged‑in user.
