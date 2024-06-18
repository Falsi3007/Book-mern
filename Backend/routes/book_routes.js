import express from "express";
import { Book } from "../model/book_model.js";

const router = express.Router();

//create a book
router.post("/", async (req, res) => { // /book/
    try {
        //title,author,year no hoi to error aapo
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: "please provide title or author or year"
            })
        }

        const newBook = {
            title : req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear
        }

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch (error) {
        console.log(error);
        return res.status(404).send(error);
    }
});

//get book
router.get("/", async (req,res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error);
        return res.status(404).send(error);
    }
})

//get particular book
router.get("/:id", async (req,res) => {
    try {
        const {id} = req.params; 
        const book = await Book.findById(id)
        return res.status(200).json(book);
       
    } catch (error) {
        console.log(error);
        return res.status(404).send(error);
    }
})

//update
router.put("/:id", async (req,res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: "please provide title or author or year"
            })
        }
        const {id} = req.params; 
        const result = await Book.findByIdAndUpdate(id,req.body);

        if (!result) {
            return res.status(400).send({
                message: "Book not fount"
            })
        }
        return res.status(200).send({message:"Book updated succssfully"});
    } catch (error) {
        console.log(error);
        return res.status(404).send(error);
    }
})

//delete
router.delete("/:id", async (req,res) => {
    try {
        const {id} = req.params; 
        const book = await Book.findByIdAndDelete(id)
        if (!book) {
            return res.status(400).send({
                message: "Book not fount"
            })
        }
        return res.status(200).send({message:"Book delete succssfully"});
    } catch (error) {
        console.log(error);
        return res.status(404).send(error);
    }
})

export default router;