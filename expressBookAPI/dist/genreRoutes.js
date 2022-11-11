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
const getGenreRouter = (database) => {
    const genreRouter = express_1.default.Router();
    genreRouter.get("/", (req, res) => {
        console.log("Getting genres");
        database.getGenres().then((genres) => {
            res.send(genres);
        });
        console.log("after genre get");
    });
    genreRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const genre = yield findGenre(req.params.id);
        if (!genre)
            return res.status(404).send("Could not find that genre");
        res.send(genre);
    }));
    genreRouter.post("/", (req, res) => {
        const body = req.body;
        const { error } = validateGenre(body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const genre = Object.assign({}, body);
        database.addGenre(genre).then((data) => res.send(data));
    });
    genreRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const genre = yield findGenre(req.params.id);
        if (!genre)
            return res.status(404).send("Could not find that genre");
        const body = req.body;
        const { error } = validateGenre(body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const updatedGenre = {
            id: genre.id,
            name: body.name,
        };
        database.updateGenre(updatedGenre).then(() => res.send(genre));
    }));
    genreRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const genre = yield findGenre(req.params.id);
        if (!genre)
            return res.status(404).send("Could not find that genre");
        yield database.deleteGenre(genre.id);
        res.send(genre);
    }));
    const findGenre = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const genre = database.getGenre(parseInt(id));
        return genre;
    });
    const validateGenre = (genre) => {
        const schema = joi_1.default.object({
            name: joi_1.default.string().min(3).required(),
        });
        return schema.validate(genre);
    };
    return genreRouter;
};
exports.default = getGenreRouter;
//# sourceMappingURL=genreRoutes.js.map