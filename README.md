# Library Management System

Full-stack TypeScript application untuk manajemen perpustakaan.

## Tech Stack
- **Backend**: Node.js, Express, TypeScript, MySQL
- **Frontend**: React, TypeScript, Vite
- **Database**: MySQL (XAMPP)

## Project Structure
```
ts-library-management/
├── backend/          # Express API Server
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── models/      # Database models
│   │   ├── controllers/ # Request handlers
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Auth & error handling
│   │   └── server.ts    # Entry point
│   └── package.json
├── frontend/         # React Application
│   ├── src/
│   │   ├── pages/       # React pages
│   │   ├── services/    # API services
│   │   └── main.tsx     # Entry point
│   └── package.json
└── database/         # SQL schema
    └── schema.sql
```

## Setup Instructions

### Database Setup
1. Start XAMPP (Apache & MySQL)
2. Open phpMyAdmin
3. Import `database/schema.sql`

### Backend Setup
```bash
cd backend
npm install
# Create .env file (copy from .env.example)
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

## Features
- ✅ Admin authentication
- ✅ Category management (CRUD)
- ✅ Book management (CRUD)
- ✅ One-to-many relationship (Category-Books)
- ✅ Search & filter functionality
- ✅ MVC pattern implementation
- ✅ Error handling

## Development Notes
- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:3000`
- Make sure MySQL is running before starting backend
