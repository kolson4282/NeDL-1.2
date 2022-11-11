import * as dotenv from "dotenv";
import express from "express";
import getBookRouter from "./bookRoutes";
import BookDatabase from "./db/connect";
import genreRouter from "./genreRoutes";
dotenv.config();

const app = express();

const url = process.env.MONGODB_URL || "";

const dbName = "books";
const database = new BookDatabase(dbName, url);

app.use(express.json());
app.use(express.static("src/public"));
app.use(express.static("dist/public"));

app.get("/api", (req, res) => {
  res.send("This is my book API");
});

app.use("/api/books", getBookRouter(database));
app.use("/api/genres", genreRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
