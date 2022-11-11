"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const express_1 = __importDefault(require("express"));
const genreRoutes_1 = require("./genreRoutes");
const books = [
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
const getBookRouter = (database) => {
    const bookRouter = express_1.default.Router();
    bookRouter.get("/", (req, res) => {
        database.getBooks().then((books) => {
            res.send(books);
        });
    });
    bookRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield findBook(req.params.id);
        if (!book)
            return res.status(404).send("Could not find that book");
        res.send(book);
    }));
    bookRouter.post("/", (req, res) => {
        const body = req.body;
        const { error } = validateBook(body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const book = Object.assign({}, body);
        if (!(0, genreRoutes_1.findGenre)(book.genreID))
            return res.status(404).send("Could not find a genre with that ID");
        bookID++;
        database.addBook(book).then((data) => res.send(data));
    });
    bookRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield findBook(req.params.id);
        if (!book)
            return res.status(404).send("Could not find that book");
        const body = req.body;
        const { error } = validateBook(body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const updatedBook = {
            id: book.id,
            title: body.title,
            author: body.author,
            genreID: body.genreID,
        };
        database.updateBook(updatedBook).then(() => res.send(updatedBook));
    }));
    bookRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield findBook(req.params.id);
        if (!book)
            return res.status(404).send("Could not find that book");
        yield database.deleteBook(book.id);
        res.send(book);
    }));
    const findBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const book = database.getBook(parseInt(id));
        return book;
    });
    const validateBook = (book) => {
        const schema = joi_1.default.object({
            title: joi_1.default.string().min(3).required(),
            author: joi_1.default.string().min(3).required(),
            genreID: joi_1.default.number().required(),
        });
        return schema.validate(book);
    };
    return bookRouter;
};
exports.default = getBookRouter;
//# sourceMappingURL=bookRoutes.js.map