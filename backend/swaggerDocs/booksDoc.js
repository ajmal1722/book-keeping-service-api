/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of all books
 *     description: Get a list of all books with details such as title, author, and image URL.
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "615a8ef8f0b5b122f8f3b581"
 *                       title:
 *                         type: string
 *                         example: "The Great Gatsby"
 *                       author:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "615a8e8bf0b5b122f8f3b581"
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *                       imageUrl:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-09-12T14:48:00.000Z"
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Retrieve details of a specific book by its ID.
 *     description: Returns the details of a book including the author details, library details, and borrower details.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to retrieve.
 *     responses:
 *       200:
 *         description: Book details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 book:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the book.
 *                     title:
 *                       type: string
 *                       description: The title of the book.
 *                     coverImage:
 *                       type: string
 *                       description: The URL of the book's cover image.
 *                     isAvailable:
 *                       type: boolean
 *                       description: Availability status of the book.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time the book was created.
 *                     author_details:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The unique identifier of the author.
 *                         name:
 *                           type: string
 *                           description: The name of the author.
 *                         email:
 *                           type: string
 *                           description: The email of the author.
 *                     library_details:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: The unique identifier of the library.
 *                           name:
 *                             type: string
 *                             description: The name of the library.
 *                           inventory:
 *                             type: object
 *                             properties:
 *                               isAvailable:
 *                                 type: boolean
 *                                 description: Availability status of the book in the library.
 *                               borrower_details:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                     description: The unique identifier of the borrower.
 *                                   name:
 *                                     type: string
 *                                     description: The name of the borrower.
 *                                   email:
 *                                     type: string
 *                                     description: The email of the borrower.
 *       400:
 *         description: Bad request. Book ID is required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book entry
 *     tags: [Books]
 *     requestBody:
 *       description: Details of the book to be created
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the book
 *                 example: "The Great Gatsby"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image of the book
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book created successfully"
 *                 book:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d9f6f1a8f5e53b1c9f1a1d"
 *                     title:
 *                       type: string
 *                       example: "The Great Gatsby"
 *                     author:
 *                       type: string
 *                       example: "F. Scott Fitzgerald"
 *                     imageUrl:
 *                       type: string
 *                       example: "https://storage.googleapis.com/bucket-name/book-images/1627994915123_image.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-09-12T12:34:56.789Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Title is required"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Author not found"
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Book already exists"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Image upload failed"
 */

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update details of a specific book by its ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to update
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token for authentication
 *         schema:
 *           type: string
 *       - in: formData
 *         name: title
 *         type: string
 *         required: true
 *         description: The new title of the book
 *       - in: formData
 *         name: coverImage
 *         type: file
 *         required: false
 *         description: The new cover image of the book
 *     responses:
 *       200:
 *         description: The book was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book updated successfully
 *                 book:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f2b2c2d3e4a3c8a0b8d3c7
 *                     title:
 *                       type: string
 *                       example: Updated Book Title
 *                     author:
 *                       type: string
 *                       example: 64d2b2c2d3e4a3c8a0b8d3c7
 *                     imageUrl:
 *                       type: string
 *                       example: https://storage.googleapis.com/bucket-name/book-images/image.jpg
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-09-13T12:34:56.789Z
 *       400:
 *         description: Invalid request
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by its ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to delete
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token for authentication
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The book was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book deleted successfully
 *                 bookId:
 *                   type: string
 *                   example: 64f2b2c2d3e4a3c8a0b8d3c7
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Book or Author not found
 *       500:
 *         description: Internal server error
 */
