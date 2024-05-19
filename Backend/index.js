import express, { json } from 'express';
import {PORT, DB_URL} from './secret.js'
import mongoose from 'mongoose';
import bookRouter from './routes/book_routes.js'
import cors from 'cors'

const app = express();
app.use(express.json());

app.use(cors())

app.listen(PORT, ()=> {
    console.log("Server is running on port 3000");
})


app.use('/book',bookRouter)

mongoose
    .connect(DB_URL)
    .then(()=>{console.log("DB is Connected");})
    .catch((e)=> console.log(e))


