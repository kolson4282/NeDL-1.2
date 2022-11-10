import Joi from "joi";
import express from "express";
import { findGenre } from "./genreRoutes";
const bookRouter = express.Router();

type Book = {
  id: number;
  title: string;
  author: string;
  genreID: number;
};

const books: Book[] = [
  {
    id: 1,
    title: "Hitchikers Guide to the Galaxy",
    author: "Douglas Adams",
    genreID: 1,
  },
  {
    id: 2,
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    genreID: 2,
  },
];

let bookID = 3;

// endpoint /api/books

bookRouter.get("/", (req, res) => {
  res.send(books);
});

bookRouter.get("/:id", (req, res) => {
  const book = findBook(req.params.id);
  if (!book) return res.status(404).send("Could not find that book");
  res.send(book);
});

bookRouter.post("/", (req, res) => {
  const body = req.body;
  const { error } = validateBook(body);
  if (error) return res.status(400).send(error.details[0].message);
  const book: Book = {
    id: bookID,
    ...body,
  };
  if (!findGenre(book.genreID))
    return res.status(404).send("Could not find a genre with that ID");
  bookID++;
  books.push(book);
  res.send(book);
});

bookRouter.put("/:id", (req, res) => {
  const book = findBook(req.params.id);
  if (!book) return res.status(404).send("Could not find that book");

  const body = req.body;
  const { error } = validateBook(body);
  if (error) return res.status(400).send(error.details[0].message);

  book.title = body.title;
  book.author = body.author;
  book.genreID = body.genreID;

  res.send(book);
});

bookRouter.delete("/:id", (req, res) => {
  const book = findBook(req.params.id);
  if (!book) return res.status(404).send("Could not find that book");

  const index = books.indexOf(book);
  books.splice(index, 1);
  res.send(book);
});

const findBook = (id: string | number): Book | undefined => {
  return books.find((book) => book.id === parseInt(`${id}`));
};

const validateBook = (book: any): Joi.ValidationResult<any> => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    genreID: Joi.number().required(),
  });
  return schema.validate(book);
};

export default bookRouter;
