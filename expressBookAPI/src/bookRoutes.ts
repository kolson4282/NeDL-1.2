import Joi from "joi";
import express from "express";
import BookDatabase from "./db/connect";

type Book = {
  id: number;
  title: string;
  author: string;
  genreID: number;
};

// endpoint /api/books

const getBookRouter = (database: BookDatabase) => {
  const bookRouter = express.Router();

  bookRouter.get("/", (req, res) => {
    database.getBooks().then((books) => {
      res.send(books);
    });
  });

  bookRouter.get("/:id", async (req, res) => {
    const book = await findBook(req.params.id);
    if (!book) return res.status(404).send("Could not find that book");
    res.send(book);
  });

  bookRouter.post("/", async (req, res) => {
    const body = req.body;
    const { error } = validateBook(body);
    if (error) return res.status(400).send(error.details[0].message);
    const book: Book = {
      ...body,
    };

    database.addBook(book).then((data) => res.send(data));
  });

  bookRouter.put("/:id", async (req, res) => {
    const book = await findBook(req.params.id);
    if (!book) return res.status(404).send("Could not find that book");

    const body = req.body;
    const { error } = validateBook(body);
    if (error) return res.status(400).send(error.details[0].message);
    const updatedBook: Book = {
      id: book.id,
      title: body.title,
      author: body.author,
      genreID: body.genreID,
    };
    database.updateBook(updatedBook).then(() => res.send(updatedBook));
  });

  bookRouter.delete("/:id", async (req, res) => {
    const book = await findBook(req.params.id);
    if (!book) return res.status(404).send("Could not find that book");

    await database.deleteBook(book.id);
    res.send(book);
  });

  const findBook = async (id: string) => {
    const book = database.getBook(parseInt(id));
    return book;
  };

  const validateBook = (book: any): Joi.ValidationResult<any> => {
    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      author: Joi.string().min(3).required(),
      genreID: Joi.number().required(),
    });
    return schema.validate(book);
  };
  return bookRouter;
};

export default getBookRouter;
