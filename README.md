The Moriah Project

A therapeutic tool created for people to express what they wish they could say to someone who has passed away from suicide

Architecture
- Next.js
- React 
- Typescript
- Tailwind 

Note: authentication and persistence are currently in demo mode, backend services, database schema, and CI/CD pipelines are actively in development

Key Features
1. Memorial Post Creation
    - long-form writing experience
    - structured fields for: name of the deceased, background/context, “What I wish I could say” reflection

2. Post Browsing
    - list of recent posts
    - individual post pages
    
Database Schema 

table: users
- id 
- display name  
- email 
- role
- created at 
- updated at 

table: posts 
- id 
- author_id 
- deceased_name
- background 
- content 
- status 
- created at
- updated at 
