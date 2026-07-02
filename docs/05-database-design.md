# Database Design

## Overview

Viscas uses a relational database to store application data, user preferences, AI interactions, and productivity information.

The database is designed using a modular approach, where each feature is represented by an independent entity with clearly defined relationships.

---

# Database Objectives

- Store user information securely
- Maintain user preferences
- Store application-specific data
- Support AI features
- Maintain scalability
- Reduce data duplication

---

# Core Entities

The initial version of Viscas consists of the following database entities:

- Users
- User Settings
- Tasks
- AI Conversations
- AI History
- Subscriptions
- Activity Logs

---

# Entity Relationship Overview

```

Users
│
├── UserSettings
├── Tasks
├── AIConversations
├── AIHistory
├── Subscription
└── ActivityLogs

```

---

# Entity Descriptions

## Users

Stores authenticated user information.

Attributes:

- id
- name
- email
- profileImage
- provider
- createdAt
- updatedAt

---

## User Settings

Stores application preferences.

Attributes:

- id
- userId
- theme
- language
- timezone
- notificationsEnabled

---

## Tasks

Stores personal tasks created inside Viscas.

Attributes:

- id
- userId
- title
- description
- status
- priority
- dueDate
- createdAt

---

## AI Conversations

Stores user conversations with the AI Assistant.

Attributes:

- id
- userId
- title
- createdAt

---

## AI History

Stores AI requests and responses.

Attributes:

- id
- conversationId
- prompt
- response
- model
- createdAt

---

## Subscription

Stores subscription details.

Attributes:

- id
- userId
- plan
- status
- renewalDate

---

## Activity Logs

Stores important user activities.

Examples:

- Login
- Logout
- Email Sent
- AI Request
- Calendar Sync

Attributes:

- id
- userId
- action
- createdAt

---

# Security Considerations

- Passwords are never stored.
- Authentication uses Google OAuth.
- Gmail data is not permanently stored by default.
- Sensitive tokens are encrypted.
- Database access is restricted through backend APIs.

---

# Future Database Expansion

Future entities may include:

- Team Workspaces
- Shared Calendars
- Notifications
- File Attachments
- Browser Sessions
- AI Memory
- Workflow Automation

---

# Summary

The database is designed to support a modular AI-powered productivity platform while remaining scalable, secure, and easy to maintain.