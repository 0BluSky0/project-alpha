# Eureka! — Backend

Node.js/Express REST API for Eureka!, an educational quiz game built for Hive secondary schools. Handles authentication, quiz delivery, score tracking, and a leaderboard.

---

## Tech stack

- Node.js + Express
- PostgreSQL (hosted on Supabase)
- bcrypt for password hashing
- JWT for authentication
- Jest + Supertest for testing

---

## Getting started

### Prerequisites

- Node.js v18+
- A PostgreSQL database (local or Supabase)

### Installation

```bash
cd server
npm install
```

### Environment variables

Create a `.env` file in the `server/` directory:

```
DB_URL=your_production_database_url
DB_TEST_URL=your_test_database_url
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=10
PORT=3000
```

### Set up the database

```bash
npm run seed-db
```

This runs `setup.sql` which creates all tables and seeds the initial subjects, questions, and options.

### Run the server

```bash
npm run dev      # development (nodemon)
npm start        # production
```

Server runs on `http://localhost:3000` by default.

---

## API reference

All protected routes require an `Authorization: Bearer <token>` header.

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/signup` | No | Register a new user |
| POST | `/auth/login` | No | Login and receive a JWT |
| PATCH | `/auth/colour-scheme` | Yes | Update the user's colour scheme |

**POST /auth/signup**
```json
// Request
{ "username": "string", "email": "string", "password": "string" }

// Response 201
{ "id": 1, "username": "string", "email": "string", "role": "student", "total_xp": 0, "level": 1 }
```

**POST /auth/login**
```json
// Request
{ "email": "string", "password": "string" }

// Response 200
{ "success": true, "token": "jwt_token_string" }
```

**PATCH /auth/colour-scheme**
```json
// Request
{ "colourScheme": "dark" }

// Response 200
{ "id": 1, "username": "string", "colour_scheme": "dark", ... }
```

---

### Subjects

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/subjects` | No | Get all subjects |

**GET /subjects**
```json
// Response 200
[
  { "id": 1, "name": "Ancient Egypt" },
  { "id": 2, "name": "Ancient Greece" }
]
```

---

### Game

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/game/questions/:subjectId` | Yes | Get questions with options for a subject |
| POST | `/game/submit` | Yes | Submit a completed quiz |

**GET /game/questions/:subjectId**
```json
// Response 200
[
  {
    "id": 1,
    "subject_id": 1,
    "question_text": "What were the tombs of Egyptian pharaohs called?",
    "question_type": "multiple_choice",
    "options": [
      { "id": 1, "question_id": 1, "option_text": "Pyramids", "is_correct": true },
      { "id": 2, "question_id": 1, "option_text": "Temples", "is_correct": false }
    ]
  }
]
```

**POST /game/submit**
```json
// Request
{ "subjectId": 1, "score": 80, "xpEarned": 50 }

// Response 201
{ "id": 1, "user_id": 1, "subject_id": 1, "score": 80, "xp_earned": 50 }
```

---

### Scores

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/scores/leaderboard` | No | Top users by XP |
| GET | `/scores/dashboard` | Yes | Current user's data and session history |

**GET /scores/leaderboard**
```json
// Response 200
[
  { "id": 1, "username": "string", "total_xp": 300, "level": 4 }
]
```

**GET /scores/dashboard**
```json
// Response 200
{
  "user": { "id": 1, "username": "string", "total_xp": 150, "level": 3 },
  "sessions": [
    { "id": 1, "subject_id": 1, "score": 80, "xp_earned": 50 }
  ]
}
```

---

## XP and levels

| Level | XP required |
|-------|-------------|
| 1 | 0 |
| 2 | 50 |
| 3 | 150 |
| 4 | 300 |
| 5 | 500 |

---

## Project structure

```
server/
├── controllers/       # Route handlers
├── models/            # Database query logic
├── routers/           # Express routers
├── middleware/        # JWT auth middleware
├── database/
│   ├── db.js          # Database connection (switches on NODE_ENV)
│   ├── setup.js       # Runs setup.sql
│   └── setup.sql      # Schema + seed data
└── __tests__/
    ├── unit/          # Unit tests (models, controllers, middleware)
    └── integration/   # Integration tests (full endpoint tests)
```

---

## Running tests

```bash
npm run unitTests         # Unit tests in watch mode
npm run integrationTests  # Integration tests (requires DB_TEST_URL)
npm run coverage          # Coverage report for unit tests
```

Unit and integration tests run separately — unit tests mock the database, integration tests hit a real test database.

Current unit test coverage: **98%+**
