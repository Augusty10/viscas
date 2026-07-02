# Deployment Architecture

## Overview

The Viscas deployment architecture is designed to be secure, scalable, and cloud-native. The application follows a multi-tier deployment model where the frontend, backend, database, AI services, and third-party integrations operate as independent layers.

This architecture enables easy scaling, simplified maintenance, and future expansion while following modern SaaS deployment practices.

---

# Deployment Architecture

```
                           User
                             │
                             ▼
                      Cloudflare CDN
                             │
                             ▼
                     Vercel Frontend
                        (Next.js)
                             │
                HTTPS REST API Requests
                             │
                             ▼
                  Viscas Backend Server
                   (Next.js / Node.js)
                             │
      ┌──────────────┬──────────────┬──────────────┐
      ▼              ▼              ▼
 PostgreSQL      Corsair AI      Google APIs
  Database                         │
                                   ├── Gmail API
                                   └── Calendar API
```

---

# Deployment Components

## Frontend

Platform

- Vercel

Responsibilities

- Landing Page
- Dashboard
- Gmail UI
- Calendar UI
- AI Chat UI

---

## Backend

Platform

- Railway (Recommended)
or
- Render
or
- VPS (Future)

Responsibilities

- Authentication
- API
- Business Logic
- AI Orchestration
- Gmail Integration
- Calendar Integration

---

## Database

Platform

- Neon PostgreSQL (Recommended)

Alternative

- Supabase PostgreSQL

Responsibilities

- Users
- Settings
- Tasks
- AI History
- Subscription
- Activity Logs

---

## AI Layer

Provider

- Corsair AI

Responsibilities

- Smart Reply
- Email Summary
- Meeting Summary
- AI Chat
- AI Search

---

## Google Services

Connected APIs

- Gmail API
- Google Calendar API
- Google OAuth

---

# Environment Variables

Frontend

```
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_API_URL
```

Backend

```
DATABASE_URL

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

GOOGLE_REDIRECT_URI

CORSAIR_API_KEY

JWT_SECRET

NEXTAUTH_SECRET

NEXTAUTH_URL
```

---

# Deployment Flow

```
Developer

     │

Git Push

     │

GitHub Repository

     │

Automatic Deployment

     │

Frontend → Vercel

Backend → Railway

Database → Neon

     │

Production
```

---

# CI/CD Pipeline

```
Developer

↓

GitHub

↓

Build

↓

Tests

↓

Deploy

↓

Production
```

---

# Security

- HTTPS Only
- Environment Variables
- OAuth 2.0
- Database Encryption
- API Authentication
- Secure Cookies
- Rate Limiting

---

# Monitoring

Future

- Vercel Analytics
- Railway Metrics
- Sentry
- UptimeRobot

---

# Backup Strategy

Database

- Daily Backup
- Weekly Snapshot
- Point-in-Time Recovery (Future)

---

# Scalability

Future deployment supports:

- Docker
- Kubernetes
- Load Balancer
- Redis
- CDN
- Multi-region Deployment

---

# Production Workflow

```
User

↓

Cloudflare

↓

Frontend (Vercel)

↓

Backend API

↓

Authentication

↓

Business Logic

↓

Database

↓

Google APIs

↓

Corsair AI

↓

Response

↓

Frontend
```

---

# Summary

The Viscas deployment architecture follows a modern cloud-native SaaS model. By separating the frontend, backend, database, AI services, and third-party integrations into independent layers, the platform achieves better scalability, maintainability, security, and deployment flexibility while remaining suitable for future enterprise growth.