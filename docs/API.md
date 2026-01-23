# API Reference

## Overview

Techtonic uses Vercel Serverless Functions as its API layer. All endpoints are prefixed with `/api`.

---

## Base URL

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:5173/api` |
| Production | `https://your-app.vercel.app/api` |

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

---

## Endpoints

### Authentication

#### POST /api/auth/login

Authenticate user and receive JWT token.

**Request:**
```json
{
  "email": "admin@tectonic.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": "24h",
  "user": {
    "id": 1,
    "email": "admin@tectonic.com",
    "name": "System Admin",
    "role": "admin"
  }
}
```

**Errors:**

| Code | Message |
|------|---------|
| 400 | Email and password required |
| 401 | Invalid email or password |
| 500 | Authentication failed |

---

#### GET /api/auth/verify

Verify current JWT token validity.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "valid": true,
  "user": {
    "id": 1,
    "email": "admin@tectonic.com",
    "name": "System Admin",
    "role": "admin"
  },
  "expiresAt": "2026-01-24T10:00:00.000Z"
}
```

---

### Content Management

#### GET /api/content/:type

Retrieve content by type.

**Valid Types:**
- `wings`
- `team`
- `timeline`
- `partnerships`
- `projects`
- `techStack`
- `roadmap`
- `homeContent`
- `companyContent`
- `innovationContent`

**Response (200):**
```json
[
  {
    "id": "software",
    "name": "Software Mechanism",
    "tagline": "Digital Foundations",
    ...
  }
]
```

---

#### POST /api/content/:type

Save/update content (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "data": [
    {
      "id": "software",
      "name": "Software Mechanism",
      ...
    }
  ]
}
```

**Response (200):**
```json
{
  "success": true,
  "type": "wings"
}
```

---

#### GET /api/content

Retrieve all content at once (bulk load).

**Response (200):**
```json
{
  "content": {
    "wings": [...],
    "team": [...],
    ...
  },
  "config": {
    "siteSettings": {...},
    "contactConfig": {...}
  }
}
```

---

### Configuration

#### GET /api/config/:key

Retrieve configuration by key.

**Valid Keys:**
- `siteSettings`
- `contactConfig`

**Response (200):**
```json
{
  "siteName": "Techtonic",
  "siteTagline": "Architecting Tomorrow",
  "maintenanceMode": false,
  "allowRegistration": false
}
```

---

#### POST /api/config/:key

Save/update configuration.

**Request:**
```json
{
  "value": {
    "siteName": "Techtonic",
    "siteTagline": "New Tagline",
    ...
  }
}
```

---

### User Management

#### GET /api/auth/users

List all users (admin only).

**Response (200):**
```json
[
  {
    "id": 1,
    "email": "admin@tectonic.com",
    "name": "System Admin",
    "role": "admin",
    "created_at": "2026-01-23T10:00:00.000Z"
  }
]
```

---

#### POST /api/auth/users

Create new user (admin only).

**Request:**
```json
{
  "email": "new@user.com",
  "password": "securepassword",
  "name": "New User",
  "role": "admin"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "message": "Detailed description"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 405 | Method Not Allowed |
| 409 | Conflict |
| 500 | Server Error |

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding for production.

---

## CORS

All endpoints support CORS with the following headers:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```
