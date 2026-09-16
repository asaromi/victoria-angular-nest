# License & Book Management System

This project is an implemented Book Management CRUD using NestJS (Node.js) and Angular, with PostgreSQL as the database and Prisma as the ORM.
The project is designed to manage books with a RESTful API and a modern web interface.

## Tech Stack

- **Backend:** NestJS 12 (TypeScript)
- **Frontend:** Angular 19 (Material UI, Tailwind CSS)
- **Database:** PostgreSQL
- **ORM:** Prisma 6

## Project Structure

```
api-nest/
├── src/
│   ├── books/          # Book module (CRUD, Search, Borrow logic)
│   ├── other-module/   # Other modules (if any)
│   └── common/         # Shared filters, DTOs, and Prisma service
├── prisma/             # Schema and migrations
└── test/               # E2E tests (not used yet)
frontend-angular/
├── src/app/
│   ├── features/       # Feature modules (Book, etc.)
|   |   └── books/      # Book module (CRUD, Search, Borrow logic)
│   ├── core/           # Core services and models
│   └── shared/         # Shared components (Header, etc.)
shared/
├── utils/              # Shared utilities (DTOs, constants, etc.)
└── other-shared/       # Other shared resources
```

## Project Limitation

- This is a simplified management system and does **not** include full authentication or authorization logic.
- API responses follow a consistent format using `ApiResponseDto` and `ApiPaginationResponseDto`.
- Validation is still basic and coverage manually on the service layer.
- The current book module does not include unit tests.

## Requirements

### Assumption

#### Book Module
- Validation:
    - `judul`: required, max length 150
    - `penulis`: required, max length 64
    - `tahunTerbit`: required, not in the future
    - `isbn`: required, unique
    - `stok`: required, minimum 0
- Searchable by `judul` and `kategori` via query parameters.

## Technical Requirement
- Defined Models (Prisma):
    - `Book`
- API Endpoints
    - Books: `GET /api/books`, `POST /api/books`, `PUT /api/books/:id`, `DELETE /api/books/:id`, `POST /api/books/:id/borrow`

### Sample API Endpoints (Books)

#### 1. Get All Books (with Pagination & Search)
- **URL:** `GET /api/books?page=1&limit=10&judul=Clean+Code`
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "judul": "Clean Code",
      "penulis": "Robert C. Martin",
      "tahunTerbit": 2008,
      "isbn": "978-0132350884",
      "stok": 10,
      "kategori": "Programming",
      "createdAt": "2026-09-16T13:11:00.000Z",
      "updatedAt": "2026-09-16T13:11:00.000Z"
    }
  ],
  "meta": {
    "limit": 10,
    "page": 1,
    "totalData": 1
  },
  "statusCode": 200,
  "message": "Books successfully retrieved"
}
```

#### 2. Create Book
- **URL:** `POST /api/books`
- **Request Body:**
```json
{
  "judul": "The Pragmatic Programmer",
  "penulis": "Andrew Hunt, David Thomas",
  "tahunTerbit": 1999,
  "isbn": "978-0201616224",
  "stok": 5,
  "kategori": "Software Engineering"
}
```
- **Response:**
```json
{
  "success": true,
  "data": {
    "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "judul": "The Pragmatic Programmer",
    "penulis": "Andrew Hunt, David Thomas",
    "tahunTerbit": 1999,
    "isbn": "978-0201616224",
    "stok": 5,
    "kategori": "Software Engineering",
    "createdAt": "2026-09-16T13:12:00.000Z",
    "updatedAt": "2026-09-16T13:12:00.000Z"
  },
  "statusCode": 201,
  "message": "Book successfully created"
}
```

#### 3. Update Book
- **URL:** `PUT /api/books/:id`
- **Request Body:**
```json
{
  "stok": 15
}
```
- **Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "judul": "Clean Code",
    "penulis": "Robert C. Martin",
    "tahunTerbit": 2008,
    "isbn": "978-0132350884",
    "stok": 15,
    "kategori": "Programming",
    "createdAt": "2026-09-16T13:11:00.000Z",
    "updatedAt": "2026-09-16T13:13:00.000Z"
  },
  "statusCode": 200,
  "message": "Book with id 550e8400-e29b-41d4-a716-446655440000 successfully updated"
}
```

#### 4. Borrow Book
- **URL:** `POST /api/books/:id/borrow`
- **Request Body:**
```json
{
  "qty": 2
}
```
- **Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "stok": 13,
    ...
  },
  "statusCode": 200,
  "message": "Book with id 550e8400-e29b-41d4-a716-446655440000 successfully borrowed"
}
```

#### 5. Delete Book
- **URL:** `DELETE /api/books/:id`
- **Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Book with id 550e8400-e29b-41d4-a716-446655440000 successfully deleted"
}
```

#### 6. Error Responses (Validation & Business Logic)

##### **400 Bad Request (Validation Error)**
- **Scenario:** Missing required fields, negative stock, or future year of publication.
- **Response:**
```json
{
  "statusCode": 400,
  "message": [
    "Stok must be positive",
    "Tahun terbit cannot be in the future"
  ],
  "error": "Bad Request"
}
```

##### **404 Not Found (Book doesn't exist)**
- **Scenario:** Accessing or updating a book that doesn't exist.
- **Response:**
```json
{
  "statusCode": 404,
  "message": "Book not found",
  "error": "Not Found"
}
```

##### **409 Conflict (Duplicate ISBN)**
- **Scenario:** Creating or updating a book with an ISBN that already exists in the database.
- **Response:**
```json
{
  "statusCode": 409,
  "message": "ISBN already exists",
  "error": "Conflict"
}
```

## Setup & Installation
### Setup Requirement
- Node.js >= 22
- PostgreSQL service running
- Prisma CLI
- Yarn package manager (recommend)

### Backend Setup (api-nest)
1. Navigate to `api-nest` directory.
2. Install dependencies: `yarn --dev`
3. Copy `.env.example` to `.env` and update `DATABASE_URL`.
4. Run migrations/sync database: `yarn prisma db push`
5. Generate Prisma Client: `yarn prisma generate`
6. Start the server: `yarn start:dev`
7. Default backend runs on `http://localhost:8000`.

### Frontend Setup (frontend-angular)
1. Navigate to `frontend-angular` directory.
2. Install dependencies: `yarn --dev`
3. Start the development server: `yarn start`
4. You can update your port on `package.json > scripts > start` if needed.
5. You can update backend port on `src/environments/environment.ts` if needed.
6. Access the app at `http://localhost:3000` (Backend runs on `http://localhost:8000`).

### Directly run both Frontend and Backend
1. Navigate to the root directory of the project.
2. Don't forget to update any port or database source like the steps above
3. Run `yarn --dev` to install all package both `frontend-angular` and `api-nest`
4. Run both servers concurrently: `yarn start`
5. Access the frontend at `http://localhost:3000` and backend at `http://localhost:8000`.

