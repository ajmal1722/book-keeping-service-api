# Bookkeeping Service API

## Overview

The Bookkeeping Service API provides a system to manage Books, Users (Authors and Borrowers), and Libraries. It enables users to register, authenticate, borrow books, and manage library inventories. The API supports multilingual responses (English and Hindi) and includes authorization checks to ensure secure access to resources.

## Features

- **Books Management:** Create, retrieve, update, and delete books.
- **Users Management:** Register and authenticate users (Authors and Borrowers).
- **Library Management:** Manage libraries and their inventories.
- **Borrowing and Returning:** Borrow and return books, with charges.
- **Multilingual Support:** API responses in English and Hindi.
- **Authorization:** Role-based access control with JWT authentication.

## Project Structure

- **Books:** A book is associated with an author (User) and can be borrowed by another user. Each book is owned by a library.
- **Users:** Can be either Authors (who write books) or Borrowers (who borrow books).
- **Libraries:** Stores information about books and their availability for borrowing.

## API Endpoints

### Books

- **GET /api/books**: Retrieve a list of all books.
- **GET /api/books/:id**: Retrieve details of a specific book by its ID, including the library, author, and borrower details.
- **POST /api/books**: Create a new book entry.
- **PUT /api/books/:id**: Update details of a specific book by its ID.
- **DELETE /api/books/:id**: Delete a book by its ID.

### Users

- **POST /api/users/register**: Register a new user (both authors and borrowers).
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