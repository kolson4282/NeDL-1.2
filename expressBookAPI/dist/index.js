"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookRoutes_1 = __importDefault(require("./bookRoutes"));
const genreRoutes_1 = __importDefault(require("./genreRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static("src/public"));
app.use(express_1.default.static("dist/public"));
app.get("/api", (req, res) => {
    res.send("This is my book API");
});
app.use("/api/books", bookRoutes_1.default);
app.use("/api/genres", genreRoutes_1.default);
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
//# sourceMappingURL=index.js.map