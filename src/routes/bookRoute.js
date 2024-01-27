const express = require("express");
const route = new express.Router();
const BookController = require("../controllers/bookController");

route.get("/books", (req, res) => { BookController.getBooksList(req, res); });
route.post("/books", (req, res) => { BookController.addBook(req, res) });
route.delete("/books/:book_id", (req, res) => { BookController.removeBookById(req, res); });
route.post("/books/byid", (req, res) => { BookController.getBookById(req, res); });
route.post("/books/bydate", (req, res) => { BookController.getBookByDate(req, res); });
route.post("/books/byrecordtype", (req, res) => { BookController.getBookByRecordType(req, res); });
route.patch("/books", (req, res) => { BookController.updateBook(req, res); });

module.exports = route;