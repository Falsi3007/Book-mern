import express from 'express';
import { PORT, mongoDBURL} from './secret.js';
import mongoose from 'mongoose';
import booksRoutes from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors())

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to Express server')
})

app.use('/books', booksRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT , () => {
            console.log("Server is running on port ${PORT}");
        });
    })
    .catch((error) => {
        console.log(error);
    })