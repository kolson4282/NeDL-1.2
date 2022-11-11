import Joi from "joi";
import express from "express";
import BookDatabase from "./db/connect";

// endpoint /api/genres
const getGenreRouter = (database: BookDatabase) => {
  const genreRouter = express.Router();

  genreRouter.get("/", (req, res) => {
    console.log("Getting genres");
    database.getGenres().then((genres) => {
      res.send(genres);
    });
    console.log("after genre get");
  });

  genreRouter.get("/:id", async (req, res) => {
    const genre = await findGenre(req.params.id);
    if (!genre) return res.status(404).send("Could not find that genre");
    res.send(genre);
  });

  genreRouter.post("/", (req, res) => {
    const body = req.body;
    const { error } = validateGenre(body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre: Genre = {
      ...body,
    };
    database.addGenre(genre).then((data) => res.send(data));
  });

  genreRouter.put("/:id", async (req, res) => {
    const genre = await findGenre(req.params.id);
    if (!genre) return res.status(404).send("Could not find that genre");

    const body = req.body;
    const { error } = validateGenre(body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedGenre: Genre = {
      id: genre.id,
      name: body.name,
    };

    database.updateGenre(updatedGenre).then(() => res.send(genre));
  });

  genreRouter.delete("/:id", async (req, res) => {
    const genre = await findGenre(req.params.id);
    if (!genre) return res.status(404).send("Could not find that genre");

    await database.deleteGenre(genre.id);
    res.send(genre);
  });

  const findGenre = async (id: string) => {
    const genre = database.getGenre(parseInt(id));
    return genre;
  };

  const validateGenre = (genre: any): Joi.ValidationResult<any> => {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });
    return schema.validate(genre);
  };

  return genreRouter;
};
export default getGenreRouter;
