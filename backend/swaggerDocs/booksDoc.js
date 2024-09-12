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
 *     summary: Retrieve a book by ID
 *     description: Retrieve details of a specific book including its author, library, and borrower information.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: A single book object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 book:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     coverImage:
 *                       type: string
 *                     isAvailable:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     author_details:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                     library_details:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           inventory:
 *                             type: object
 *                             properties:
 *                               isAvailable:
 *                                 type: boolean
 *                               borrower_details:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                                   email:
 *                                     type: string
 *       400:
 *         description: Bad Request - Book ID required
 *       404:
 *         description: Book not found
 */
