import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import booksRouter from './routes/booksRouter.js';

const port = process.env.PORT || 5000;

const app = express();

app.use('/api/books', booksRouter)

app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})