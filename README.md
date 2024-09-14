# Bookkeeping Service API

## Overview

The Bookkeeping Service API provides a system to manage Books, Authors and libraries. User can have upto 3 roles which includes authors, borrower and library owner. It enables users to register, authenticate, borrow books, and manage library inventories. The API supports multilingual responses (English and Hindi) and includes authorization checks to ensure secure access to resources.

## Features

- **Books Management:** Create, retrieve, update, and delete books. Only the author of the book can update and delete the Book.
- **Users Management:** Register and authenticate users and add roles based on their activity.
- **Library Management:** Manage libraries and their inventories. Only the library owner can Update and delete library and library inventory
- **Borrowing and Returning:** Borrow and return books, with charges.
- **Multilingual Support:** API responses in English and Hindi based on user preferance.
- **Authorization:** Role-based access control with JWT authentication.

## Project Structure

- **Books:** A book is associated with an author (User) and can be borrowed by another user. Each book is owned by a library.
- **Users:** Can be either Authors (who write books) or Borrowers (who borrow books) or the library owner (who owns library).
- **Libraries:** Stores information about books and their availability for borrowing.

## API Endpoints

### Books

- **GET /api/books**: Retrieve a list of all books.
- **GET /api/books/:id**: Retrieve details of a specific book by its ID, including the library, author, and borrower details.
- **POST /api/books**: Create a new book entry.
- **PUT /api/books/:id**: Update details of a specific book by its ID.
- **DELETE /api/books/:id**: Delete a book by its ID.

### Users

- **POST /api/users/register**: Register a new user (both authors, borrowers and library owner).
- **POST /api/users/login**: Authenticate a user and generate  JWT access and refresh token.

### Borrowing

- **POST /api/borrow**: Borrow a book, incurring a charge.
- **PUT /api/return/:id**: Return a borrowed book by its ID.

### Libraries

- **GET /api/libraries**: Retrieve a list of all libraries.
- **GET /api/libraries/:id**: Retrieve details of a specific library by its ID, including all books owned by the library and borrower details.
- **POST /api/libraries**: Create a new library.
- **PUT /api/libraries/:id**: Update details of a specific library by its ID.
- **DELETE /api/libraries/:id**: Delete a library by its ID.

### Library Inventory

- **GET /api/libraries/:id/inventory**: Retrieve a list of books available in a specific library.
- **POST /api/libraries/:id/inventory**: Add a book to the inventory of a specific library.
- **DELETE /api/libraries/:id/inventory/:bookId**: Remove a book from the inventory of a specific library by its ID.

## Getting Started

### Prerequisites

- **Node.js** 
- **MongoDB** 
- **Firebase**: For storing book cover images.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ajmal1722/book-keeping-service-api
   cd bookkeeping-service-api

2. **Install dependencies:**

   ```bash
   npm install

3. **Set up environment variables:**

   ```bash
   NODE_ENV=production
   PORT=8000
   MONGO_URI=<Your MongoDB URI>
   JWT_ACCESS_SECRET=<Your JWT access secret>
   JWT_REFRESH_SECRET=<Your JWT refresh secret>
   FIREBASE_API_KEY=<Your Firebase API key>
   FIREBASE_STORAGE_BUCKET=<Your Firebase storage bucket>
   FIREBASE_TYPE=service_account
   FIREBASE_PROJECT_ID=<Your Firebase project ID>
   FIREBASE_PRIVATE_KEY_ID=<Your Firebase private key ID>
   FIREBASE_PRIVATE_KEY=<Your Firebase private key>
   FIREBASE_CLIENT_EMAIL=<Your Firebase client email>
   FIREBASE_CLIENT_ID=<Your Firebase client ID>
   FIREBASE_AUTH_URI=<Your Firebase auth URI>
   FIREBASE_TOKEN_URI=<Your Firebase token URI>
   FIREBASE_AUTH_PROVIDER_X509_CERT_URL=<Your Firebase auth provider CERT URL>
   FIREBASE_CLIENT_X509_CERT_URL=<Your Firebase client X509 certificate URL>
   FIREBASE_UNIVERSE_DOMAIN=<Your Firebase universe domanin>

4. **Run the application:**

   ```bash
   npm run server

## API Documentation

https://app.swaggerhub.com/apis-docs/AJUAJMAL1722001/book-keeping-service-api-docs/1.0.0#/