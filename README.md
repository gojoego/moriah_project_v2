The Moriah Project

A forum created for people to express what they wish they could say to someone who has passed away from suicide

## Architecture

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Supabase

### Infrastructure
- Fly.io deployment
- GitHub Actions CI pipeline
    - TypeScript validation
    - Automated testing
    - Build verification

(currently expanding )

# Key Features

1. Authentication
- User signup and login
- JWT-based authentication
- Protected API routes
- User profile retrieval
- Password reset workflow
    - Secure token generation
    - Expiring reset links
    - Email delivery through Resend

2. Create Memorial Posts
- Users can create long-form reflections containing:
    - Name of the deceased
    - Background/context
    - "What I wish I could say" reflection

3. Browse Posts
Users can:
- View recent memorial posts
- View individual post pages
- View their own submitted posts

4. Post Management
Authenticated users can:
- Create posts
- Update their own posts
- Delete their own posts

5. Administrative Portal (in development)

# Database Schema

## users

| Column | Description |
|---|---|
| id | UUID primary key |
| display_name | User display name |
| email | Unique user email |
| password | Hashed password |
| role | User permission level |
| password_reset_token_hash | Hash of the password reset token |
| password_reset_expires_at | Password reset expiration timestamp |
| created_at | Account creation timestamp |
| updated_at | Last update timestamp |

## posts

| Column | Description |
|---|---|
| id | UUID primary key |
| author_id | User who created the post |
| deceased_name | Name of deceased person |
| background | Background and context |
| content | Memorial reflection |
| status | Post visibility status |
| created_at | Creation timestamp |
| updated_at | Last update timestamp |


# API Overview

## Authentication

POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
POST /api/auth/forgot-password
POST /api/auth/reset-password

## Posts

GET /api/posts
GET /api/posts/:id
GET /api/posts/me
POST /api/posts
PUT /api/posts/:id
DELETE /api/posts/:id

# Development Status

Completed:

✅ Frontend authentication flows  
✅ Backend API architecture  
✅ PostgreSQL database schema  
✅ JWT authentication  
✅ Protected routes  
✅ Memorial post CRUD operations  
✅ Password reset workflow  
✅ Email integration with Resend  
✅ Automated CI checks with GitHub Actions  

Currently working on:

- Expanding automated test coverage
- Production hardening
- Additional user experience improvements
- Deployment automation improvements

---

# Engineering Practices

- Type-safe development with TypeScript
- API validation using Zod
- Automated testing with Jest and Supertest
- Database migrations using Supabase CLI
- Environment-based configuration
- CI validation through GitHub Actions

---

# Motivation

The Moriah Project was created to provide a dedicated space for people to process grief through writing, reflection, and remembrance after losing someone to suicide.

## Ownership

The Moriah Project and its original source code are owned by **gojoego LLC**.

Copyright © 2025–2026 gojoego LLC. All rights reserved.

This repository is publicly viewable for portfolio and demonstration purposes.
No license is granted for reuse, modification, or distribution of the original
project code. Third-party dependencies remain subject to their respective licenses.