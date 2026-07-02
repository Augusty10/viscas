# Component Architecture

## Overview

Viscas follows a modular, reusable, and scalable component architecture based on the Atomic Design philosophy and the Next.js App Router.

Each component has a single responsibility and is designed to be reusable across multiple pages and features.

The architecture minimizes duplication, improves maintainability, and enables rapid feature development.

---

# Architecture Principles

Every component should follow these principles:

- Single Responsibility
- Reusability
- Composition over Duplication
- Type Safety
- Accessibility
- Responsive Design
- Performance First

---

# Component Hierarchy

```
Application

│

├── Layout

│     ├── Navbar
│     ├── Sidebar
│     ├── Footer

│

├── Pages

│     ├── Dashboard
│     ├── Gmail
│     ├── Calendar
│     ├── Tasks
│     ├── Settings

│

├── Sections

│     ├── Hero
│     ├── Features
│     ├── Pricing
│     ├── FAQ

│

├── Components

│     ├── Cards
│     ├── Forms
│     ├── Buttons
│     ├── Dialogs
│     ├── Tables

│

└── UI
      ├── Button
      ├── Input
      ├── Badge
      ├── Avatar
      ├── Tooltip
```

---

# Project Structure

```
components/

common/
layout/
landing/
dashboard/
gmail/
calendar/
tasks/
settings/
subscription/
ai/
ui/
icons/
providers/
```

---

# Component Categories

## Common Components

Reusable everywhere.

Examples:

- Container
- Section
- Heading
- Logo
- Loader

---

## Layout Components

Application structure.

Examples:

- Navbar
- Sidebar
- Footer
- DashboardLayout

---

## Landing Components

Public website.

Examples:

- Hero
- Features
- Pricing
- Testimonials
- FAQ

---

## Feature Components

Business modules.

Examples:

- GmailList
- EmailViewer
- CalendarGrid
- TaskCard
- AIChatPanel

---

## UI Components

Generic UI elements.

Examples:

- Button
- Card
- Badge
- Dialog
- Dropdown
- Tabs
- Tooltip

---

# Server vs Client Components

## Server Components

Used for:

- Initial Rendering
- Data Fetching
- SEO
- Static Content

Examples

- Landing Page
- Pricing Page
- Documentation

---

## Client Components

Used when interaction is required.

Examples

- Forms
- Search
- AI Chat
- Calendar
- Email Editor
- Theme Switcher

Every interactive component must include:

```tsx
"use client";
```

---

# Component Naming Convention

Components use PascalCase.

Examples

```
Navbar.tsx

Hero.tsx

EmailCard.tsx

CalendarGrid.tsx

TaskList.tsx
```

Hooks

```
useAuth.ts

useTheme.ts

useInbox.ts
```

Utilities

```
formatDate.ts

generatePrompt.ts

validators.ts
```

---

# Props Design

Every component should:

- Accept only required props
- Avoid deeply nested props
- Prefer composition over inheritance

Example

```tsx
<Button variant="primary" size="lg">
    Get Started
</Button>
```

---

# State Management Strategy

Local State

React useState

Shared UI State

Context API

Server Data

React Query (Future)

Authentication

NextAuth Session

---

# Styling Rules

Technology

- Tailwind CSS
- CSS Variables
- shadcn/ui

Avoid

- Inline styles
- Duplicate utility classes
- Hardcoded colors

---

# Performance Guidelines

- Lazy load heavy components
- Dynamic imports where needed
- Memoize expensive components
- Optimize images with Next.js Image
- Avoid unnecessary client components

---

# Accessibility

Every component must support:

- Keyboard Navigation
- Focus States
- ARIA Labels
- Screen Readers
- Color Contrast

---

# Component Lifecycle

```
Design

↓

Develop

↓

Review

↓

Test

↓

Document

↓

Reuse
```

---

# Future Expansion

The architecture supports:

- Plugin Components
- Multi-Workspace
- White Label UI
- Theme Packs
- Enterprise Modules

---

# Summary

The Viscas Component Architecture is designed to ensure consistency, scalability, and maintainability across the application. By organizing components into clear categories and following reusable design principles, the project can grow without becoming difficult to manage.