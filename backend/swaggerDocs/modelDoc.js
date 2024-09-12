/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the book.
 *           example: "615a8ef8f0b5b122f8f3b581"
 *         title:
 *           type: string
 *           description: The title of the book.
 *           example: "The Great Gatsby"
 *         author:
 *           type: string
 *           description: The ID of the author (reference to User schema).
 *           example: "615a8e8bf0b5b122f8f3b581"
 *         imageUrl:
 *           type: string
 *           description: The URL of the book's cover image.
 *           example: "https://example.com/image.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the book was created.
 *           example: "2023-09-12T14:48:00.000Z"
 *       example:
 *         title: "The Great Gatsby"
 *         author: "615a8e8bf0b5b122f8f3b581"
 *         imageUrl: "https://example.com/image.jpg"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Library:
 *       type: object
 *       required:
 *         - name
 *         - owner
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the library.
 *           example: "615a8ef8f0b5b122f8f3b582"
 *         name:
 *           type: string
 *           description: The name of the library.
 *           example: "Central Library"
 *         owner:
 *           type: string
 *           description: The ID of the library owner (reference to User schema).
 *           example: "615a8e8bf0b5b122f8f3b583"
 *         inventory:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: The ID of the book in the inventory.
 *                 example: "615a8ef8f0b5b122f8f3b581"
 *               borrower:
 *                 type: string
 *                 description: The ID of the borrower (reference to User schema).
 *                 example: "615a8e8bf0b5b122f8f3b584"
 *               borrowedAt:
 *                 type: string
 *                 format: date-time
 *                 description: The date when the book was borrowed.
 *                 example: "2023-09-12T14:48:00.000Z"
 *               isAvailable:
 *                 type: boolean
 *                 description: Availability status of the book.
 *                 example: false
 *               charge:
 *                 type: number
 *                 description: The charge associated with borrowing the book.
 *                 example: 5.0
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the library was created.
 *           example: "2023-09-12T14:48:00.000Z"
 *       example:
 *         name: "Central Library"
 *         owner: "615a8e8bf0b5b122f8f3b583"
 *         inventory:
 *           - bookId: "615a8ef8f0b5b122f8f3b581"
 *             borrower: "615a8e8bf0b5b122f8f3b584"
 *             borrowedAt: "2023-09-12T14:48:00.000Z"
 *             isAvailable: false
 *             charge: 5.0
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user.
 *           example: "615a8ef8f0b5b122f8f3b584"
 *         name:
 *           type: string
 *           description: The name of the user.
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: The email of the user.
 *           example: "johndoe@example.com"
 *         password:
 *           type: string
 *           description: The hashed password of the user.
 *           example: "hashedpassword123"
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *             enum: ['author', 'borrower', 'library']
 *           description: The roles assigned to the user.
 *           example: ["author", "borrower"]
 *         booksWritten:
 *           type: array
 *           items:
 *             type: string
 *             description: The IDs of books written by the user.
 *             example: "615a8ef8f0b5b122f8f3b581"
 *         borrowedBooks:
 *           type: array
 *           items:
 *             type: string
 *             description: The IDs of books borrowed by the user.
 *             example: "615a8ef8f0b5b122f8f3b582"
 *         librariesOwned:
 *           type: array
 *           items:
 *             type: string
 *             description: The IDs of libraries owned by the user.
 *             example: "615a8ef8f0b5b122f8f3b583"
 *         refreshToken:
 *           type: string
 *           description: Refresh token for authentication.
 *           example: "someRefreshToken123"
 *       example:
 *         name: "John Doe"
 *         email: "johndoe@example.com"
 *         password: "hashedpassword123"
 *         roles: ["author", "borrower"]
 *         booksWritten: ["615a8ef8f0b5b122f8f3b581"]
 *         borrowedBooks: ["615a8ef8f0b5b122f8f3b582"]
 *         librariesOwned: ["615a8ef8f0b5b122f8f3b583"]
 */