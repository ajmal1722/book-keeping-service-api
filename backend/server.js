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
import i18next from './config/i18nConfig.js';
import i18nextMiddleware from 'i18next-http-middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swaggerConfig.js';

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

// Use i18next middleware in Express
app.use(i18nextMiddleware.handle(i18next));

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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