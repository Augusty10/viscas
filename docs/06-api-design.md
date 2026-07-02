# API Design

## Overview

Viscas follows an API-First architecture where every client interaction is processed through secure backend APIs before communicating with external services.

The frontend never communicates directly with third-party providers such as Gmail, Google Calendar, or AI services. All requests pass through the Viscas Backend API, which is responsible for authentication, validation, business logic, security, and response formatting.

This architecture improves security, maintainability, scalability, and allows the platform to integrate additional providers in the future without affecting the frontend.

---

# API Architecture

```
                 Client (Next.js)
                        │
                        ▼
               Viscas Backend API
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
 Authentication      AI Service      Google Services
        │               │                │
        ▼               ▼                ▼
 Google OAuth       Corsair AI      Gmail API
                                      Calendar API
```

---

# API Design Principles

Every API developed in Viscas follows these principles:

- RESTful Architecture
- Secure by Default
- Stateless Requests
- JSON-Based Communication
- Modular API Design
- Version Controlled APIs
- Consistent Response Structure

---

# Authentication

Every protected endpoint requires authentication.

Authentication Method:

- Google OAuth 2.0

Authorization:

- Bearer Access Token
- Secure HTTP-only Session Cookies (implementation dependent)

Unauthorized requests must return:

```

401 Unauthorized

```

---

# API Modules

Viscas APIs are organized into independent modules.

## Authentication API

Responsible for:

- Login
- Logout
- Session Validation
- Token Refresh
- User Profile

---

## User API

Responsible for:

- User Information
- Profile
- Preferences
- Settings

---

## Gmail API

Responsible for:

- Inbox
- Email Details
- Send Email
- Search Emails
- Labels
- Attachments
- Drafts

---

## Calendar API

Responsible for:

- Events
- Create Meeting
- Update Meeting
- Delete Event
- Availability
- Reminders

---

## AI API

Responsible for:

- Smart Reply
- Email Summary
- Meeting Summary
- Natural Language Search
- AI Chat
- Productivity Suggestions

---

## Dashboard API

Responsible for collecting data from multiple modules and returning a single optimized response for the dashboard.

The dashboard should not call multiple APIs independently whenever possible.

Instead:

Dashboard API

↓

Gmail

↓

Calendar

↓

Tasks

↓

AI Suggestions

↓

Single Response

---

## Task API

Responsible for:

- Create Task
- Update Task
- Delete Task
- Complete Task
- Priority Management

---

## Settings API

Responsible for:

- Theme
- Language
- Timezone
- Notification Settings
- Connected Accounts

---

# Standard Request Lifecycle

Every request inside Viscas follows the same lifecycle.

```
Client Request
        │
        ▼
Authentication
        │
        ▼
Authorization
        │
        ▼
Request Validation
        │
        ▼
Business Logic
        │
        ▼
Third Party Services
        │
        ▼
Data Processing
        │
        ▼
Standard Response
```

---

# Standard API Response

Successful Response

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {}
}
```

Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request."
  }
}
```

Every API should return a consistent response structure.

---

# Error Handling

Common Status Codes

| Code | Meaning |
|------|----------|
|200|Success|
|201|Created|
|204|No Content|
|400|Bad Request|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|409|Conflict|
|422|Validation Error|
|429|Rate Limited|
|500|Internal Server Error|

---

# Security

All APIs must follow the following security practices:

- HTTPS Only
- OAuth Authentication
- Server-side Validation
- Rate Limiting
- Input Sanitization
- Secure Token Storage
- Principle of Least Privilege

The frontend never exposes access tokens or communicates directly with Google APIs.

---

# API Versioning

All APIs should support versioning.

Example:

```
/api/v1/
```

Future releases:

```
/api/v2/
```

This ensures backward compatibility.

---

# Scalability

The API architecture is designed to support future integrations including:

- Microsoft Outlook
- Microsoft Teams
- Slack
- Notion
- Google Drive
- Multiple AI Providers
- Team Workspaces
- Workflow Automation

No frontend architectural changes should be required when introducing new providers.

---

# Summary

The Viscas API architecture is designed using an API-First approach with a strong emphasis on security, modularity, scalability, and maintainability.

Every external service—including Gmail, Google Calendar, and AI providers—is accessed exclusively through the Viscas Backend API, ensuring consistent business logic, centralized security, and a clean separation between the frontend and third-party services.