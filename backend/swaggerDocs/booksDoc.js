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
