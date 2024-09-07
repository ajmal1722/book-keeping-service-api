import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDB from './config/connectDB.js';
import errorHandler from './middlewares/errorMiddleware.js'; 
import booksRouter from './routes/booksRouter.js';
import userRouter from './routes/userRouter.js'; 
import borrowRouter from './routes/borrowingRouter.js';
import libraryRouter from './routes/libraryRoter.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// Connecting to MongoDB
connectDB()

// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Parse cookies
app.use(morgan('tiny')); // Logging requests

// Routes
app.use('/api/users', userRouter);
app.use('/api/books', booksRouter);
app.use('/api', borrowRouter);
app.use('/api/libraries', libraryRouter);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Error handler middleware (should be defined last)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});