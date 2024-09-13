/**
 * @swagger
 * /api/libraries:
 *   get:
 *     summary: Retrieve a list of all libraries
 *     tags: [Library]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of libraries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 libraries:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 64f2b2c2d3e4a3c8a0b8d3c7
 *                       name:
 *                         type: string
 *                         example: Main Library
 *       404:
 *         description: No libraries found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/libraries/{id}:
 *   get:
 *     summary: Retrieve details of a specific library by its ID
 *     tags: [Library]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the library to retrieve
 *         example: 64f2b2c2d3e4a3c8a0b8d3c7
 *     responses:
 *       200:
 *         description: Successfully retrieved the library details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Library details retrieved successfully
 *                 library:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f2b2c2d3e4a3c8a0b8d3c7
 *                     name:
 *                       type: string
 *                       example: Main Library
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-09-01T00:00:00Z
 *                     inventory:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           book_details:
 *                             type: object
 *                             properties:
 *                               bookId:
 *                                 type: string
 *                                 example: 64f2b2c2d3e4a3c8a0b8d3c8
 *                               title:
 *                                 type: string
 *                                 example: Example Book Title
 *                               coverImage:
 *                                 type: string
 *                                 example: https://example.com/book-cover.jpg
 *                               charge:
 *                                 type: number
 *                                 example: 10.0
 *                               isAvailable:
 *                                 type: boolean
 *                                 example: true
 *                               borrowedAt:
 *                                 type: string
 *                                 format: date-time
 *                                 example: 2024-09-13T10:00:00Z
 *                           borrower_details:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: 64f2b2c2d3e4a3c8a0b8d3c9
 *                               name:
 *                                 type: string
 *                                 example: John Doe
 *                               email:
 *                                 type: string
 *                                 example: johndoe@example.com
 *       400:
 *         description: Library ID is required
 *       404:
 *         description: Library not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/libraries:
 *   post:
 *     summary: Create a new library
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Central Library
 *     responses:
 *       201:
 *         description: Library created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Library created successfully
 *                 library:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f2b2c2d3e4a3c8a0b8d3c7
 *                     name:
 *                       type: string
 *                       example: Central Library
 *       400:
 *         description: Library name is required or other validation errors
 *       404:
 *         description: User not found
 *       409:
 *         description: Library already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/libraries/{id}:
 *   put:
 *     summary: Update details of a specific library by its ID
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the library to update
 *         example: 64f2b2c2d3e4a3c8a0b8d3c7
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Library Name
 *     responses:
 *       200:
 *         description: Library updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Library updated successfully
 *                 library:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f2b2c2d3e4a3c8a0b8d3c7
 *                     name:
 *                       type: string
 *                       example: Updated Library Name
 *       400:
 *         description: Library ID is required or invalid input
 *       403:
 *         description: Access denied or user does not own the library
 *       404:
 *         description: Library or User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/libraries/{id}:
 *   delete:
 *     summary: Delete a library by its ID
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the library to delete
 *         example: 64f2b2c2d3e4a3c8a0b8d3c7
 *     responses:
 *       200:
 *         description: Library deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Library deleted successfully
 *                 deletedId:
 *                   type: string
 *                   example: 64f2b2c2d3e4a3c8a0b8d3c7
 *       400:
 *         description: Library ID is required
 *       403:
 *         description: Access denied or user does not own the library
 *       404:
 *         description: Library or User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/libraries/{id}/inventory:
 *   get:
 *     summary: Retrieve a list of books available in a specific library
 *     description: Get the inventory of books in a specific library, including details of each book.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the library to retrieve the inventory from.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the library's inventory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Library inventory retrieved successfully
 *                 library:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Library ID
 *                     name:
 *                       type: string
 *                       description: Name of the library
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date when the library was created
 *                     inventory:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Book ID
 *                           title:
 *                             type: string
 *                             description: Title of the book
 *                           coverImage:
 *                             type: string
 *                             description: URL of the book's cover image
 *                           charge:
 *                             type: number
 *                             format: double
 *                             description: Charge for borrowing the book
 *                           isAvailable:
 *                             type: boolean
 *                             description: Availability status of the book
 *                           borrowedAt:
 *                             type: string
 *                             format: date-time
 *                             description: Date when the book was borrowed
 *                           borrower_details:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 description: Borrower's ID
 *                               name:
 *                                 type: string
 *                                 description: Borrower's name
 *                               email:
 *                                 type: string
 *                                 description: Borrower's email
 *       404:
 *         description: Library not found or empty inventory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Library not found or empty inventory
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/libraries/{id}/inventory:
 *   post:
 *     summary: Add a book to the inventory of a specific library
 *     description: Add a book to the inventory of a specific library, specifying the charge for borrowing.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the library to add the book to.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: The ID of the book to add to the inventory
 *               charge:
 *                 type: number
 *                 format: double
 *                 description: Charge for borrowing the book
 *     responses:
 *       200:
 *         description: Successfully added the book to the library's inventory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book added to inventory successfully
 *                 inventory:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Book ID
 *                       title:
 *                         type: string
 *                         description: Title of the book
 *                       coverImage:
 *                         type: string
 *                         description: URL of the book's cover image
 *                       charge:
 *                         type: number
 *                         format: double
 *                         description: Charge for borrowing the book
 *                       isAvailable:
 *                         type: boolean
 *                         description: Availability status of the book
 *                       borrowedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Date when the book was borrowed
 *                       borrower_details:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Borrower's ID
 *                           name:
 *                             type: string
 *                             description: Borrower's name
 *                           email:
 *                             type: string
 *                             description: Borrower's email
 *       400:
 *         description: Book ID or charge is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book ID and charge are required
 *       404:
 *         description: Library or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Library or user not found
 *       403:
 *         description: Access denied to add book to inventory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access denied to add book to inventory
 *       409:
 *         description: Book already in inventory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book already in inventory
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/libraries/{id}/inventory/{bookId}:
 *   delete:
 *     summary: Remove a book from the inventory of a specific library
 *     description: Remove a book from the inventory of a specific library by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the library to remove the book from.
 *         schema:
 *           type: string
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: The ID of the book to remove from the inventory
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully removed the book from the library's inventory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book removed from inventory successfully
 *                 inventory:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Book ID
 *                       title:
 *                         type: string
 *                         description: Title of the book
 *                       coverImage:
 *                         type: string
 *                         description: URL of the book's cover image
 *                       charge:
 *                         type: number
 *                         format: double
 *                         description: Charge for borrowing the book
 *                       isAvailable:
 *                         type: boolean
 *                         description: Availability status of the book
 *                       borrowedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Date when the book was borrowed
 *                       borrower_details:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Borrower's ID
 *                           name:
 *                             type: string
 *                             description: Borrower's name
 *                           email:
 *                             type: string
 *                             description: Borrower's email
 *       400:
 *         description: Library ID or Book ID is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Library ID and Book ID are required
 *       404:
 *         description: Library or book not found in the inventory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Library or book not found in the inventory
 *       403:
 *         description: Access denied to remove book from inventory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access denied to remove book from inventory
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
