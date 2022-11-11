"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const bookRoutes_1 = __importDefault(require("./bookRoutes"));
const connect_1 = __importDefault(require("./db/connect"));
const genreRoutes_1 = __importDefault(require("./genreRoutes"));
dotenv.config();
const app = (0, express_1.default)();
const url = process.env.MONGODB_URL || "";
const dbName = "books";
const database = new connect_1.default(dbName, url);
app.use(express_1.default.json());
app.use(express_1.default.static("src/public"));
app.use(express_1.default.static("dist/public"));
app.get("/api", (req, res) => {
    res.send("This is my book API");
});
app.use("/api/books", (0, bookRoutes_1.default)(database));
app.use("/api/genres", (0, genreRoutes_1.default)(database));
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
//# sourceMappingURL=index.js.map