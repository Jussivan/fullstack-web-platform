# Fullstack Web Platform - Incident Management System

A production-ready fullstack application for incident management built with modern technologies and best practices.

## Overview

This project implements a complete incident reporting and management system with user authentication, real-time incident tracking, and a responsive user interface. The application demonstrates comprehensive full-stack development practices including backend API development, database design, frontend architecture, and extensive testing.

## Features

- User authentication with JWT tokens (7-day expiration)
- Create, read, update, and delete incidents
- Real-time user association with incidents
- Responsive design for mobile and desktop
- Comprehensive input validation on client and server
- Dark mode interface
- User profile management
- 38 passing tests (19 backend, 19 frontend)

## Technology Stack

### Backend
- Express.js: RESTful API framework
- TypeScript: Static type checking
- Prisma: Type-safe ORM with SQLite
- JWT: Secure token-based authentication
- Bcrypt: Password hashing (10 salt rounds)
- Zod: Runtime type validation
- Jest: Unit testing framework

### Frontend
- React 18: Modern UI library with hooks
- TypeScript: Full type safety
- Vite: Lightning-fast build tool
- Tailwind CSS: Utility-first CSS framework
- Shadcn/ui: High-quality component library
- React Router: Client-side routing
- Vitest: Component and hook testing

## Prerequisites

Node.js v18.0.0 or higher
npm v9.0.0 or higher

Verify installation:
```bash
node --version
npm --version
```

## Installation and Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/fullstack-web-platform.git
cd fullstack-web-platform
```

### 2. Backend Configuration

```bash
cd backend

npm install

# Create .env file
cp .env.example .env

# Set up database and run migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Backend runs on http://localhost:3000

### 3. Frontend Configuration

```bash
cd frontend

npm install

# Create .env file
VITE_API_URL=http://localhost:3000/api

# Start development server
npm run dev
```

Frontend runs on http://localhost:5173

## Environment Variables

### Backend (.env)

```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
NODE_ENV="development"
PORT=3000
```

### Frontend (.env)

```bash
VITE_API_URL="http://localhost:3000/api"
```

## Running Tests

### Backend Tests

```bash
cd backend
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

Test coverage: 19 passing tests
- Auth service validation (password hashing, JWT, email validation)
- Incident service validation (data structure, status management)

### Frontend Tests

```bash
cd frontend
npm test -- --run       # Run once
npm test                # Watch mode
npm test:ui             # UI mode
```

Test coverage: 19 passing tests
- Authentication context and token management
- Incidents hook and data fetching
- Component rendering and interactions

## Project Structure

```
fullstack-web-platform/
├── backend/
│   ├── src/
│   │   ├── server.ts              Main application
│   │   ├── controllers/           Route handlers
│   │   ├── services/              Business logic
│   │   ├── routes/                API route definitions
│   │   ├── middlewares/           Express middleware
│   │   ├── lib/                   Utilities and configuration
│   │   ├── logger/                Logging system
│   │   ├── types/                 TypeScript definitions
│   │   └── __tests__/             Test files (19 tests)
│   ├── prisma/
│   │   ├── schema.prisma          Database schema
│   │   └── migrations/            Database migrations
│   ├── jest.config.js             Test configuration
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx               Entry point
│   │   ├── App.tsx                Root component
│   │   ├── pages/                 Page components
│   │   ├── components/            Reusable components
│   │   ├── context/               React context providers
│   │   ├── hooks/                 Custom React hooks
│   │   ├── services/              API client
│   │   ├── types/                 TypeScript definitions
│   │   └── __tests__/             Test files (19 tests)
│   ├── vitest.config.ts           Test configuration
│   └── package.json
│
├── API.md                         Complete API documentation
├── TECHNICAL_NOTES.md             Architecture and design decisions
└── README.md                      This file
```

## API Documentation

For complete endpoint documentation with examples, see [API.md](./API.md)

Quick reference:
- POST /api/auth/register: User registration
- POST /api/auth/login: Authentication
- GET /api/users/profile: User profile
- GET /api/incidents: List incidents
- POST /api/incidents: Create incident
- PUT /api/incidents/:id: Update incident
- DELETE /api/incidents/:id: Delete incident

## Database Schema

### User Table
- id: UUID primary key
- email: Unique email
- name: Full name
- password: Bcrypt hashed
- createdAt: Timestamp
- updatedAt: Timestamp

### Incident Table
- id: UUID primary key
- title: Incident title
- description: Detailed description
- status: open | in-progress | closed
- userId: Foreign key to User
- createdAt: Timestamp
- updatedAt: Timestamp
- user: Related user data (included in queries)

## Authentication

JWT-based authentication with 7-day token expiration:

1. User registers or logs in
2. Server returns JWT token
3. Client stores token in localStorage
4. Token sent in Authorization header for protected routes
5. Server validates token on each request

Security measures:
- Passwords hashed with bcrypt (10 rounds)
- No password returned in API responses
- JWT tokens expire after 7 days
- Minimum password length: 6 characters

## Validation

Comprehensive validation implemented on both layers:

Frontend:
- Real-time form validation with Zod
- User-friendly error messages
- Input type and length validation

Backend:
- Zod schema validation
- Business logic validation
- Database constraint validation

## Error Handling

Consistent error responses with:
- Descriptive error messages
- Appropriate HTTP status codes
- Error logging for debugging
- User-friendly frontend messages

## Troubleshooting

### Port Already in Use
```bash
PORT=3001 npm run dev    # Backend
VITE_PORT=5174 npm run dev  # Frontend
```

### Database Issues
```bash
cd backend
npx prisma migrate reset    # Reset database
npx prisma db push          # Push schema
```

### Dependencies Not Installing
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Backend Connection Issues
- Verify backend running on http://localhost:3000
- Check VITE_API_URL in frontend .env
- Confirm CORS enabled
- Check firewall settings

## Performance Considerations

- Lazy loading on routes
- Component memoization
- Optimized database queries with relations
- CSS bundling optimized by Tailwind
- Minified production builds

## Security Considerations

Production recommendations:
- Enable HTTPS/SSL
- Implement rate limiting
- Add request logging and monitoring
- Use environment-specific configurations
- Implement request/response encryption
- Set up automated backups
- Enable API request throttling

## Development Workflow

1. Create feature branch
2. Make changes with tests
3. Run test suites to verify
4. Commit with descriptive messages
5. Push to repository

## License

MIT License

## Support

For issues or questions, create an issue in the repository.