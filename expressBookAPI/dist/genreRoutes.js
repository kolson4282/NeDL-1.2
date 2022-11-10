"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const express_1 = __importDefault(require("express"));
const genreRouter = express_1.default.Router();
const genres = [
    {
        id: 1,
        name: "Sci-Fi",
    },
    {
        id: 2,
        name: "Fantasy",
    },
    {
        id: 3,
        name: "Mystery",
    },
];
let genreID = 4;
genreRouter.get("/", (req, res) => {
    res.send(genres);
});
genreRouter.get("/:id", (req, res) => {
    const genre = findGenre(req.params.id);
    if (!genre)
        return res.status(404).send("Could not find a genre with that ID");
    res.send(genre);
});
genreRouter.post("/", (req, res) => {
    const body = req.body;
    const { error } = validateGenre(body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const genre = Object.assign({ id: genreID }, body);
    genreID++;
    genres.push(genre);
    res.send(genre);
});
genreRouter.put("/:id", (req, res) => {
    const genre = findGenre(req.params.id);
    if (!genre)
        return res.status(404).send("Could not find that genre");
    const body = req.body;
    const { error } = validateGenre(body);
    if (error)
        return res.status(400).send(error.details[0].message);
    genre.name = body.name;
    res.send(genre);
});
genreRouter.delete("/:id", (req, res) => {
    const genre = findGenre(req.params.id);
    if (!genre)
        return res.status(404).send("Could not find that genre");
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});
const findGenre = (id) => {
    return genres.find((genre) => genre.id === parseInt(`${id}`));
};
const validateGenre = (genre) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
    });
    return schema.validate(genre);
};
exports.default = genreRouter;
//# sourceMappingURL=genreRoutes.js.map