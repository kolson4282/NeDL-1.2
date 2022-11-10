import express from "express";
import path from "path";
import bookRouter from "./bookRoutes";
import genreRouter from "./genreRoutes";
const app = express();

app.use(express.json());
app.use(express.static("src/public"));
app.use(express.static("dist/public"));

app.get("/api", (req, res) => {
  res.send("This is my book API");
});

app.use("/api/books", bookRouter);
app.use("/api/genres", genreRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
