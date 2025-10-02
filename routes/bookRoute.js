import express from "express";
const router = express.Router();
import { Book } from "../models/bookModel.js";
// Route to save new book 
router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }

    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook);

    return res.status(201).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

// route to get all books from db 
router.get('/', async(req,res)=>{
    try {

       const books = await Book.find({}) ;
       return res.status(200).json({
        count : books.length,
        data: books
       });
        
    } catch (error) {
       console.log(error.message);
       res.status(500).send({
        message: error.message
       })
        
    }
})

// route to get one book with specific id
router.get('/:id', async(req,res)=>{
    try {
const {id} = req.params;
       const book = await Book.findById(id) ;
       return res.status(200).json(book);
        
    } catch (error) {
       console.log(error.message);
       res.status(500).send({
        message: error.message
       })
        
    }
}) 

//route to update the book 
router.put('/:id', async(req,res)=>{
    try {
       
       if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }  

    const {id} = req.params;
    const result = await Book.findByIdAndUpdate(id,req.body);
    if(!result){
            return res.status(400).send({
        message: "book not found ",
      });
    }
    return res.status(200).send({
        message:"book updated successfully "
    })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message:error.message
        })
        
    }
})

// route for deleteing a book
router.delete('/:id',async(req,res)=>{
    try {
      
        const {id} = req.params;
const result = await Book.findByIdAndDelete(id);
  if(!result){
            return res.status(400).send({
        message: "book not found ",
      });
    }
    return res.status(200).send({
        message:"book deleted successfully "
    })

    } catch (error) {
         console.log(error.message);
        res.status(500).send({
            message:error.message
        }) 
    }
})

export default router;

