"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const express_1 = __importDefault(require("express"));
const bookRouter = express_1.default.Router();
const books = [
    {
        id: 1,
        title: "Hitchikers Guide to the Galaxy",
        author: "Douglas Adams",
        genre: "Sci-Fi",
    },
    {
        id: 2,
        title: "The Way of Kings",
        author: "Brandon Sanderson",
        genre: "Fantasy",
    },
];
let bookID = 3;
bookRouter.get("/", (req, res) => {
    res.send(books);
});
bookRouter.get("/:id", (req, res) => {
    const book = findBook(req.params.id);
    if (!book)
        return res.status(404).send("Could not find that book");
    res.send(book);
});
bookRouter.post("/", (req, res) => {
    const body = req.body;
    const { error } = validateBook(body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const book = Object.assign({ id: bookID }, body);
    bookID++;
    books.push(book);
    res.send(book);
});
bookRouter.put("/:id", (req, res) => {
    const book = findBook(req.params.id);
    if (!book)
        return res.status(404).send("Could not find that book");
    const body = req.body;
    const { error } = validateBook(body);
    if (error)
        return res.status(400).send(error.details[0].message);
    book.title = body.title;
    book.author = body.author;
    book.genre = body.genre;
    res.send(book);
});
bookRouter.delete("/:id", (req, res) => {
    const book = findBook(req.params.id);
    if (!book)
        return res.status(404).send("Could not find that book");
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.send(book);
});
const findBook = (id) => {
    return books.find((book) => book.id === parseInt(`${id}`));
};
const validateBook = (book) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(3).required(),
        author: joi_1.default.string().min(3).required(),
        genre: joi_1.default.string().required(),
    });
    return schema.validate(book);
};
exports.default = bookRouter;
//# sourceMappingURL=bookRoutes.js.map