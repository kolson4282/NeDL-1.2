import Joi from "joi";
import express from "express";
const genreRouter = express.Router();

type Genre = {
  id: number;
  name: string;
};

const genres: Genre[] = [
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
  if (error) return res.status(400).send(error.details[0].message);
  const genre: Genre = {
    id: genreID,
    ...body,
  };
  genreID++;
  genres.push(genre);
  res.send(genre);
});

genreRouter.put("/:id", (req, res) => {
  const genre = findGenre(req.params.id);
  if (!genre) return res.status(404).send("Could not find that genre");

  const body = req.body;
  const { error } = validateGenre(body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = body.name;

  res.send(genre);
});

genreRouter.delete("/:id", (req, res) => {
  const genre = findGenre(req.params.id);
  if (!genre) return res.status(404).send("Could not find that genre");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

export const findGenre = (id: string | number): Genre | undefined => {
  return genres.find((genre) => genre.id === parseInt(`${id}`));
};

const validateGenre = (genre: any): Joi.ValidationResult<any> => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
};

export default genreRouter;
