# Technical Architecture

## Overview

Viscas follows a modern, modular, and scalable architecture based on a client-server model.

The system is divided into independent layers to improve maintainability, scalability, and future feature expansion.

```
                    User
                      │
                      ▼
              Next.js Frontend
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
 Authentication    Dashboard      UI Components
        │
        ▼
        Backend API (Next.js Route Handlers)
        │
 ┌──────┴───────────┬───────────────┐
 ▼                  ▼               ▼
Google OAuth     AI Service      Database
 │                  │               │
 ▼                  ▼               ▼
Gmail API      Corsair AI      PostgreSQL
Calendar API
```

---

# Architecture Layers

## 1. Presentation Layer

Responsible for user interaction.

Technology:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

Responsibilities:

- UI Rendering
- State Management
- User Interaction
- Form Validation
- Responsive Design

---

## 2. API Layer

Acts as the communication bridge between the frontend and external services.

Responsibilities:

- Request Validation
- Authentication
- Business Logic
- API Integration
- Error Handling

---

## 3. Authentication Layer

Authentication is handled using Google OAuth 2.0.

Responsibilities:

- User Login
- Secure Session Management
- Access Token Handling
- Refresh Token Management

---

## 4. AI Layer

The AI Layer provides intelligent features throughout the platform.

Current AI Provider:

- Corsair

Future Support:

- OpenAI
- Google Gemini
- Claude

Responsibilities:

- Email Summarization
- Smart Replies
- Meeting Summaries
- Email Classification
- Natural Language Search

---

## 5. Integration Layer

Responsible for communication with third-party services.

Current Integrations:

- Gmail API
- Google Calendar API

Future Integrations:

- Google Drive
- Notion
- Slack
- Microsoft Outlook

---

## 6. Data Layer

Responsible for persistent application data.

Database:

PostgreSQL

Stores:

- User Profile
- Preferences
- Tasks
- AI History
- Settings
- Subscription Information

Sensitive email content is **not permanently stored** unless explicitly required by the user.

---

# Design Principles

The architecture follows the following principles:

- Modular Design
- Separation of Concerns
- Scalability
- Security First
- API-First Development
- AI-First Workflow
- Component Reusability

---

# Request Flow

```
User
   │
   ▼
Frontend
   │
   ▼
API Route
   │
   ▼
Authentication
   │
   ▼
Business Logic
   │
   ▼
Corsair AI / Google APIs
   │
   ▼
Response
   │
   ▼
Frontend
```

---

# Future Scalability

The architecture is designed to support:

- Multi-AI Provider Support
- Plugin System
- Team Collaboration
- Multi-Workspace
- Real-Time Notifications
- Mobile Applications
- Browser Extension

---

# Summary

The Viscas technical architecture is designed to be modular, scalable, secure, and AI-first.

Each layer has a clearly defined responsibility, allowing future developers to extend the platform without affecting existing modules.