/**
 * @swagger
 * /api/borrow:
 *   post:
 *     summary: Borrow a book against a charge
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
 *               - libraryId
 *               - bookId
 *             properties:
 *               libraryId:
 *                 type: string
 *                 example: 64f2b2c2d3e4a3c8a0b8d3c7
 *               bookId:
 *                 type: string
 *                 example: 64f2b2c2d3e4a3c8a0b8d3c8
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book borrowed successfully
 *                 book:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f2b2c2d3e4a3c8a0b8d3c8
 *                     borrower:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 64f2b2c2d3e4a3c8a0b8d3c9
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         email:
 *                           type: string
 *                           example: johndoe@example.com
 *                     charge:
 *                       type: number
 *                       example: 10.0
 *       400:
 *         description: Library ID and Book ID are required, or Book is already borrowed
 *       404:
 *         description: Library or Book not found
 *       403:
 *         description: User not authorized to borrow books
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/return/{id}:
 *   put:
 *     summary: Return a borrowed book by its ID
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []  # Assuming JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to return
 *         example: 64f2b2c2d3e4a3c8a0b8d3c8
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - libraryId
 *             properties:
 *               libraryId:
 *                 type: string
 *                 example: 64f2b2c2d3e4a3c8a0b8d3c7
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book returned successfully
 *                 book:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f2b2c2d3e4a3c8a0b8d3c8
 *                     libraryId:
 *                       type: string
 *                       example: 64f2b2c2d3e4a3c8a0b8d3c7
 *       400:
 *         description: Library ID and Book ID are required, or Book is not borrowed
 *       404:
 *         description: Library or Book not found
 *       403:
 *         description: Book not borrowed by the user
 *       500:
 *         description: Internal server error
 */
