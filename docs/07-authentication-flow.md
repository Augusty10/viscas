# Authentication Flow

## Overview

Viscas uses Google OAuth 2.0 as its primary authentication mechanism.

Instead of creating a traditional username and password system, users authenticate using their Google Account. This approach provides a secure, reliable, and familiar sign-in experience while allowing Viscas to integrate with Gmail and Google Calendar.

The authentication system is designed around the following principles:

- Secure Authentication
- OAuth 2.0 Standard
- Least Privilege Access
- Server-side Token Management
- Stateless API Communication

---

# Authentication Architecture

```
                User
                  │
                  ▼
          Viscas Frontend
                  │
                  ▼
         Authentication API
                  │
                  ▼
            Google OAuth
                  │
                  ▼
      Google Authorization Server
                  │
                  ▼
          Access + Refresh Token
                  │
                  ▼
            Viscas Backend
                  │
                  ▼
             User Dashboard
```

---

# Authentication Workflow

## Step 1 — Login Request

The user clicks the **"Continue with Google"** button.

↓

The frontend redirects the user to Google's OAuth consent screen.

---

## Step 2 — User Authentication

Google verifies the user's identity.

The user grants permission for Viscas to access the requested Google services.

---

## Step 3 — Authorization Code

After successful authentication, Google returns an Authorization Code to the backend.

The frontend never receives Google access tokens directly.

---

## Step 4 — Token Exchange

The backend exchanges the Authorization Code for:

- Access Token
- Refresh Token
- User Information

---

## Step 5 — User Registration

If the user is logging in for the first time:

- Create User Record
- Create User Settings
- Initialize Workspace

Otherwise:

- Load Existing User

---

## Step 6 — Session Creation

The backend creates a secure authenticated session.

The frontend receives only the session information required to identify the logged-in user.

---

## Step 7 — Dashboard Access

The user is redirected to the Viscas Dashboard.

All future API requests use the authenticated session.

---

# OAuth Permissions (Scopes)

Initially Viscas requests only the permissions required for core functionality.

Required Scopes:

- User Profile
- Email Address
- Gmail Read Access
- Gmail Send Access
- Google Calendar Access

Additional permissions may be requested only when new features require them.

---

# Authentication Sequence

```
User
 │
 ▼
Login Button
 │
 ▼
Google OAuth
 │
 ▼
Authorization Code
 │
 ▼
Backend
 │
 ▼
Token Exchange
 │
 ▼
Database
 │
 ▼
Session Created
 │
 ▼
Dashboard
```

---

# Session Management

Viscas maintains authenticated sessions using secure server-side mechanisms.

Responsibilities:

- Session Creation
- Session Validation
- Session Expiration
- Logout
- Token Refresh

---

# Token Management

The backend is responsible for:

- Securely storing tokens
- Refreshing expired access tokens
- Revoking tokens during logout
- Preventing unauthorized access

Access tokens are never exposed unnecessarily to the client application.

---

# Security Measures

The authentication system follows modern security practices:

- Google OAuth 2.0
- HTTPS Only
- Secure Cookies
- CSRF Protection
- XSS Prevention
- Token Encryption
- Server-side Validation
- Principle of Least Privilege

---

# Failure Scenarios

The authentication system handles the following cases:

- User cancels login
- Invalid authorization code
- Expired access token
- Revoked permissions
- Network failure
- Unauthorized API access

Each failure returns an appropriate error response without exposing sensitive information.

---

# Logout Flow

```
User
 │
 ▼
Logout
 │
 ▼
Session Destroyed
 │
 ▼
Token Revoked
 │
 ▼
Redirect to Login
```

---

# Future Improvements

Future authentication features may include:

- Multi-Account Support
- Organization Login
- Team Workspaces
- Passkeys
- Multi-Factor Authentication (MFA)
- Session Management Dashboard
- Device Management

---

# Summary

The authentication system of Viscas is designed to provide a secure, scalable, and seamless login experience using Google OAuth 2.0. By handling authentication through the backend and following modern security best practices, Viscas ensures safe access to Gmail, Google Calendar, and future integrations while maintaining user privacy and system integrity.