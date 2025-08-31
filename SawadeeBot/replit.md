# Overview

LearnStream is a corporate learning management system (LMS) built with React, Express.js, and PostgreSQL. The platform provides structured learning paths and general video content for employee skill development, with comprehensive progress tracking and role-based content filtering. It features a modern dark-themed UI built with shadcn/ui components and integrates with Replit's authentication system.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with a dark theme design system
- **State Management**: TanStack Query for server state and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful endpoints with structured error handling
- **Session Management**: Express sessions with PostgreSQL store
- **Authentication**: Replit OAuth integration with OpenID Connect

## Data Storage
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **Schema Management**: Drizzle migrations and schema definitions
- **Session Storage**: PostgreSQL-backed session store for authentication persistence

## Key Data Models
- **Users**: Profile information with position-based role filtering
- **Learning Packs**: 17 sequential structured learning modules
- **Pack Videos**: Ordered video content within learning packs
- **General Videos**: Standalone content with category and position filtering
- **Progress Tracking**: Granular video and pack completion tracking
- **Achievements**: Gamification system for learning milestones

## Authentication & Authorization
- **Provider**: Replit OAuth with session-based authentication
- **Session Management**: Secure HTTP-only cookies with PostgreSQL persistence
- **Authorization**: Role-based access control using user position field
- **Security**: CSRF protection and secure session configuration

## Content Management
- **Structured Learning**: Sequential pack-based learning with unlock progression
- **General Content**: Category and role-filtered video library
- **Progress Tracking**: Per-video watch time and completion status
- **Search & Filter**: Multi-criteria content discovery system

# External Dependencies

## Database & Hosting
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Replit Platform**: Development environment and deployment platform

## Authentication
- **Replit Auth**: OAuth provider with OpenID Connect integration
- **Session Store**: connect-pg-simple for PostgreSQL session persistence

## UI & Components
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Accessible component foundations
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for UI elements

## Development Tools
- **Vite**: Fast development server and build tool with HMR
- **TypeScript**: Type safety across frontend and backend
- **Drizzle Kit**: Database migration and schema management
- **TanStack Query**: Server state management and caching