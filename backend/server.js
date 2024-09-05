import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorMiddleware.js'; // Import error handler
import booksRouter from './routes/booksRouter.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/books', booksRouter);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Error handler middleware (should be defined last)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});