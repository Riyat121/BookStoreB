import express from "express";
import { Book } from "../models/bookModel.js";  // <-- if you used export default in model
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Route to save new book 
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).send({ message: "Send all required fields" });
    }

    const newBook = await Book.create({ title, author, publishYear });
    return res.status(201).json(newBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get one book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).send({ message: "Book not found" });
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to update a book
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send({ message: "Send all required fields" });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book updated successfully", data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to delete a book
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;