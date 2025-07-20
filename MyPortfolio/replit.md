# Personal Portfolio Website

## Overview

This is a dual-mode portfolio and blog application for Akarsh Reddy Chiripireddy, a Senior DevOps Engineer. The application features both a professional portfolio and a personal blog, with a toggle to switch between modes. Built as a full-stack web application with React frontend and Express.js backend, it showcases professional experience, skills, contact functionality, and personal blog posts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture pattern with clear separation between frontend and backend concerns:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for fast bundling

## Key Components

### Frontend Components
- **Blog Toggle**: Switch between professional portfolio and personal blog modes
- **Professional Portfolio**:
  - Navigation: Fixed navigation with smooth scrolling
  - Hero Section: Animated introduction with typing effect and scroll animations
  - Companies Section: Showcase of employers with authentic logos
  - About Section: Professional background and statistics
  - Skills Section: Technical competencies organized by category with animations
  - Experience Section: Timeline of professional roles with company logos
  - Projects Section: Showcase of major projects with achievements
  - Contact Section: Interactive contact form with validation
- **Personal Blog**: 
  - Blog header with gradient backgrounds
  - Category filtering system
  - Blog post cards with images and tags
  - Responsive design with different visual theme
- **UI Components**: Comprehensive set of reusable components from shadcn/ui including Badge component

### Backend Components
- **API Routes**: RESTful endpoints for contact form and resume download
- **Storage Layer**: Memory-based storage implementation with interface for future database integration
- **Development Server**: Vite integration for hot module replacement in development

## Data Flow

1. **Client Requests**: React frontend makes API calls to Express backend
2. **Form Submission**: Contact form data is validated and processed server-side
3. **Static Assets**: Vite serves static assets in development, Express serves built assets in production
4. **API Responses**: JSON responses with appropriate status codes and error handling

## External Dependencies

### Frontend Dependencies
- **UI Framework**: Radix UI components for accessibility
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with Zod validation
- **Dates**: date-fns for date manipulation
- **Carousel**: Embla Carousel for interactive components

### Backend Dependencies
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod schemas for runtime type checking
- **Development**: tsx for TypeScript execution

### Database Schema
- **Users Table**: Basic user model with username and password fields
- **Schema Location**: `shared/schema.ts` for type sharing between frontend and backend

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR on port 5173
- **Backend**: tsx execution with automatic restart on changes
- **Database**: PostgreSQL with Drizzle migrations
- **Environment**: NODE_ENV=development with comprehensive logging

### Production
- **Build Process**: 
  1. Vite builds frontend to `dist/public`
  2. esbuild bundles backend to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Database**: PostgreSQL with connection pooling via Neon Database
- **Process Management**: Single Node.js process serving both API and static assets

### Configuration
- **Database**: Drizzle config points to `shared/schema.ts`
- **TypeScript**: Shared configuration across client, server, and shared modules
- **Path Aliases**: Configured for clean imports (`@/`, `@shared/`)
- **Environment Variables**: `DATABASE_URL` required for database connectivity

## Recent Changes: Latest modifications with dates

### January 19, 2025
- **Performance Optimization**: Removed heavy scroll-triggered animations that were causing browser hanging
- **Blog Toggle Feature**: Added dual-mode functionality to switch between professional portfolio and personal blog
- **Personal Blog Section**: Created complete personal blog with category filtering, blog post cards, and unique purple-gradient theme
- **Animation Optimization**: Simplified scroll animations and reduced particle count for better performance
- **Badge Component**: Added shadcn/ui Badge component for blog post tags
- **Router Refactoring**: Updated App.tsx to handle mode switching without traditional routing

The architecture prioritizes developer experience with hot reloading, type safety throughout the stack, and clear separation of concerns. The application now supports both professional portfolio and personal blog modes with optimized performance and smooth animations.