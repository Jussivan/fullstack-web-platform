# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

The token is obtained through the login or register endpoints and is valid for 7 days.

---

## Authentication Endpoints

### POST /auth/register

Create a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": "uuid-string",
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2026-05-22T10:00:00.000Z",
    "updatedAt": "2026-05-22T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes:**
- 201: User created successfully
- 400: Invalid input or user already exists
- 500: Internal server error

---

### POST /auth/login

Authenticate and receive an authentication token.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "uuid-string",
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2026-05-22T10:00:00.000Z",
    "updatedAt": "2026-05-22T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes:**
- 200: Authentication successful
- 400: Invalid credentials
- 500: Internal server error

---

## User Endpoints

### GET /users/profile

Get the authenticated user's profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "id": "uuid-string",
  "email": "john@example.com",
  "name": "John Doe",
  "createdAt": "2026-05-22T10:00:00.000Z",
  "updatedAt": "2026-05-22T10:00:00.000Z"
}
```

**Status Codes:**
- 200: Profile retrieved successfully
- 401: Unauthorized (invalid or missing token)
- 404: User not found
- 500: Internal server error

---

## Incident Endpoints

### GET /incidents

Retrieve all incidents with user information.

**Headers:**
```
Authorization: Not required
```

**Response (200 OK):**
```json
[
  {
    "id": "uuid-string",
    "title": "Database Connection Failed",
    "description": "Unable to connect to the production database",
    "status": "open",
    "userId": "uuid-string",
    "createdAt": "2026-05-22T10:00:00.000Z",
    "updatedAt": "2026-05-22T10:00:00.000Z",
    "user": {
      "id": "uuid-string",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
]
```

**Status Codes:**
- 200: Incidents retrieved successfully
- 500: Internal server error

---

### GET /incidents/:id

Retrieve a specific incident by ID.

**Parameters:**
- id (string, required): The incident UUID

**Response (200 OK):**
```json
{
  "id": "uuid-string",
  "title": "Database Connection Failed",
  "description": "Unable to connect to the production database",
  "status": "open",
  "userId": "uuid-string",
  "createdAt": "2026-05-22T10:00:00.000Z",
  "updatedAt": "2026-05-22T10:00:00.000Z",
  "user": {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Status Codes:**
- 200: Incident retrieved successfully
- 404: Incident not found
- 500: Internal server error

---

### POST /incidents

Create a new incident. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "title": "Database Connection Failed",
  "description": "Unable to connect to the production database",
  "status": "open"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid-string",
  "title": "Database Connection Failed",
  "description": "Unable to connect to the production database",
  "status": "open",
  "userId": "uuid-string",
  "createdAt": "2026-05-22T10:00:00.000Z",
  "updatedAt": "2026-05-22T10:00:00.000Z",
  "user": {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Status Codes:**
- 201: Incident created successfully
- 400: Invalid input
- 401: Unauthorized
- 500: Internal server error

---

### PUT /incidents/:id

Update an existing incident. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Parameters:**
- id (string, required): The incident UUID

**Request:**
```json
{
  "title": "Database Connection Failed - RESOLVED",
  "description": "Issue was resolved by restarting the database service",
  "status": "closed"
}
```

**Response (200 OK):**
```json
{
  "id": "uuid-string",
  "title": "Database Connection Failed - RESOLVED",
  "description": "Issue was resolved by restarting the database service",
  "status": "closed",
  "userId": "uuid-string",
  "createdAt": "2026-05-22T10:00:00.000Z",
  "updatedAt": "2026-05-22T10:50:00.000Z",
  "user": {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Status Codes:**
- 200: Incident updated successfully
- 400: Invalid input
- 401: Unauthorized
- 404: Incident not found
- 500: Internal server error

---

### DELETE /incidents/:id

Delete an incident. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Parameters:**
- id (string, required): The incident UUID

**Response (204 No Content):**
```
(empty body)
```

**Status Codes:**
- 204: Incident deleted successfully
- 401: Unauthorized
- 404: Incident not found
- 500: Internal server error

---

## Status Values

The following status values are valid for incidents:

- open: The incident is newly reported and open for investigation
- in-progress: The incident is currently being worked on
- closed: The incident has been resolved

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common error scenarios:

- 400 Bad Request: Invalid input data or missing required fields
- 401 Unauthorized: Missing or invalid authentication token
- 404 Not Found: Resource does not exist
- 500 Internal Server Error: Unexpected server error

---

## Rate Limiting

Currently, there are no rate limits implemented. This is recommended for production deployment.

---

## Pagination

Currently, the API returns all results without pagination. For large datasets, consider implementing pagination in future versions.
