# Subscription Module

## Overview

The Subscription Module manages user plans, feature access, billing, and subscription lifecycle within Viscas.

It ensures that every user has access only to the features included in their subscription while providing a seamless upgrade and renewal experience.

The module is designed to support both individual users and organizations as Viscas evolves into a SaaS platform.

---

# Objectives

The Subscription Module is responsible for:

- Plan Management
- Feature Access Control
- Subscription Lifecycle
- Billing Integration
- Usage Tracking
- Trial Management
- Upgrade & Downgrade
- Payment Verification

---

# Subscription Architecture

```
               User
                 │
                 ▼
          Pricing Page
                 │
                 ▼
        Subscription API
                 │
        ┌────────┴─────────┐
        ▼                  ▼
 Payment Gateway      Subscription Service
        │                  │
        ▼                  ▼
 Payment Status      PostgreSQL Database
        │                  │
        └────────┬─────────┘
                 ▼
          Feature Access
```

---

# Subscription Plans

## Free Plan

Features:

- Gmail Integration
- Google Calendar Integration
- Basic Dashboard
- Limited AI Requests
- Basic Email Search

Limitations:

- Daily AI usage limit
- Limited AI summaries
- No premium automation

---

## Pro Plan

Includes everything in Free plus:

- Unlimited AI Requests
- Smart Reply
- AI Email Summary
- AI Meeting Summary
- Priority Detection
- Advanced Search
- Productivity Insights
- Email Templates

---

## Team Plan

Includes everything in Pro plus:

- Team Workspace
- Shared Calendar
- Shared Tasks
- Team AI Assistant
- Admin Dashboard
- User Management
- Team Analytics

---

# Subscription Lifecycle

```
Visitor
    │
    ▼
Free Plan
    │
    ▼
Upgrade
    │
    ▼
Payment
    │
    ▼
Verification
    │
    ▼
Activate Subscription
    │
    ▼
Access Premium Features
```

---

# Feature Access

Every premium feature is protected by subscription validation.

Example

```
User

   │

Request Premium Feature

   │

Subscription Check

   │

Allowed ?

   │

Yes -----------> Execute Feature

No ------------> Upgrade Prompt
```

---

# Billing Workflow

```
Select Plan

      │

Checkout

      │

Payment Gateway

      │

Payment Success

      │

Verify Payment

      │

Update Subscription

      │

Enable Premium Features
```

---

# Database Entities

- Subscription
- SubscriptionPlan
- Payment
- Invoice
- Usage
- FeatureAccess

---

# Subscription States

- Trial
- Active
- Expired
- Cancelled
- Suspended
- Pending Payment

---

# Usage Tracking

The system tracks:

- AI Requests
- Email Summaries
- Smart Replies
- Storage Usage
- API Requests

This enables feature limits and analytics.

---

# Security

- Secure Payment Verification
- Server-side Subscription Validation
- Webhook Verification
- Fraud Prevention
- Encrypted Billing Records

---

# Future Enhancements

- Student Plan
- Lifetime Plan
- Enterprise Plan
- Coupon System
- Referral Rewards
- Family Plan
- Regional Pricing

---

# Summary

The Subscription Module provides a scalable monetization framework for Viscas by managing plans, billing, feature access, and usage limits while ensuring a secure and seamless SaaS experience.