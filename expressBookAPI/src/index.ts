import express from "express";
import bookRouter from "./bookRoutes";
import genreRouter from "./genreRoutes";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/api");
});

app.get("/api", (req, res) => {
  res.send("This is my book API");
});

app.use("/api/books", bookRouter);
app.use("/api/genres", genreRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});