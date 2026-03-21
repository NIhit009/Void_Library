const Book = require("../models/Book");
const { check, validationResult } = require("express-validator");
const fs = require("fs");
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        if (!books) return res.status(400).json({ message: "No books found.." });
        return res.status(200).json(books);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error occurred while getting the books" });
    }
}

exports.createBook = [
    check("bookName")
        .trim()
        .notEmpty()
        .withMessage("Book Name cannot be empty.."),
    check("author")
        .trim(),
    check("description")
        .trim()
        .notEmpty()
        .withMessage("Description cannot be empty.."),
    check("price")
        .trim()
        .notEmpty()
        .withMessage("Price cannot be empty.."),
    check("genre")
        .trim()
        .notEmpty()
        .withMessage("Genre cannot be empty.."),
    check("publishedBy")
        .trim(),
    check("quantity")
        .trim()
        .notEmpty()
        .withMessage("Quantity cannot be empty"),
    async (req, res) => {
        try {
            const { bookName, author, description, genre, price, publishedBy, quantity } = req.body;
            if (!req.file) {
                return res.status(400).json({ message: "File not provided.." });
            }
            const fileData = fs.readFileSync(req.file.path);
            const book = new Book({ bookName, author, description, genre, price, publishedBy, quantity, fileData });
            await book.save();
            return res.status(201).json({ message: "New Book has been created" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error while saving the book.." });
        }
    }]

exports.getSpecificBook = async (req, res) => {
    try {
        const { genre } = req.body;
        if (!genre) return res.status(404).json({ message: "Please provide a genre" });
        const genreBooks = await Book.find({ genre: genre });
        if (!genreBooks) return res.status(400).json({message: "No book's found for this genre.."});
        return res.status(200).json(genreBooks);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server error occuerred while getting the specific books.."});
    }

}