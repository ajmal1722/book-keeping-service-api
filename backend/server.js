import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import errorHandler from './middlewares/errorMiddleware.js'; 
import booksRouter from './routes/booksRouter.js';
import userRouter from './routes/userRouter.js'; 

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// Connecting to MongoDB
connectDB()

// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', userRouter);
app.use('/api/books', booksRouter);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Error handler middleware (should be defined last)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});