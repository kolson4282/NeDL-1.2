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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class BookDatabase {
    constructor(dbName, uri) {
        this.uri = uri;
        this.client = new mongodb_1.MongoClient(this.uri);
        this.dbName = dbName;
    }
    getNextBookID() {
        return __awaiter(this, void 0, void 0, function* () {
            let id = 0;
            try {
                const db = yield this.getDB();
                const col = db.collection("Counter");
                const counter = yield col.findOne();
                if (counter) {
                    id = counter.bookID;
                    counter.bookID++;
                    yield col.findOneAndReplace({}, counter);
                }
            }
            catch (error) {
                if (error instanceof Error)
                    throw error;
            }
            finally {
                yield this.closeClient();
            }
            return id;
        });
    }
    addBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            book.id = yield this.getNextBookID();
            yield this.performBookAction((col) => __awaiter(this, void 0, void 0, function* () {
                yield col.insertOne(book);
            }));
        });
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            let books = [];
            yield this.performBookAction((col) => __awaiter(this, void 0, void 0, function* () {
                books = (yield col.find({}).toArray());
            }));
            return books;
        });
    }
    getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let book;
            yield this.performBookAction((col) => __awaiter(this, void 0, void 0, function* () {
                book = (yield col.findOne({ id: id }));
            }));
            return book;
        });
    }
    updateBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.performBookAction((col) => __awaiter(this, void 0, void 0, function* () {
                yield col.findOneAndReplace({ id: book.id }, book);
            }));
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.performBookAction((col) => __awaiter(this, void 0, void 0, function* () {
                yield col.findOneAndDelete({ id: id });
            }));
        });
    }
    performBookAction(action) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield this.getDB();
                const col = db.collection("books");
                yield action(col);
            }
            catch (error) {
                if (error instanceof Error)
                    throw error;
            }
            finally {
                yield this.closeClient();
            }
        });
    }
    getDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
            return this.client.db(this.dbName);
        });
    }
    closeClient() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.close();
        });
    }
}
exports.default = BookDatabase;
//# sourceMappingURL=connect.js.map