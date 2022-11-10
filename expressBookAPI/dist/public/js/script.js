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
const bookUri = "api/books";
const genreUri = "api/genres";
let books = [];
let genres = [];
const getBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(bookUri);
    books = yield response.json();
    displayBooks();
});
const displayBooks = () => {
    const bookTable = document.getElementById("books");
    if (!bookTable)
        return;
    bookTable.innerHTML = "";
    books.forEach((book) => {
        const row = bookTable.insertRow();
        const titleCell = row.insertCell();
        titleCell.innerText = book.title;
        const authorCell = row.insertCell();
        authorCell.innerText = book.author;
        const genreCell = row.insertCell();
        const genre = genres.find((genre) => genre.id == book.genreID);
        genreCell.innerText = (genre === null || genre === void 0 ? void 0 : genre.name) || "Not Found";
        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.onclick = () => console.log("edit genre " + book.id);
        const editCell = row.insertCell();
        editCell.append(editButton);
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = () => console.log("delete genre " + book.id);
        const deleteCell = row.insertCell();
        deleteCell.append(deleteButton);
    });
};
const getGenres = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(genreUri);
    genres = yield response.json();
    displayGenres();
});
const deleteGenre = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch(`${genreUri}/${id}`, { method: "DELETE" });
    refresh();
});
const displayGenres = () => {
    const genreTable = document.getElementById("genres");
    if (!genreTable)
        return;
    genreTable.innerHTML = "";
    genres.forEach((genre) => {
        const row = genreTable.insertRow();
        const nameCell = row.insertCell();
        nameCell.innerText = genre.name;
        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.onclick = () => console.log("edit genre " + genre.id);
        const editCell = row.insertCell();
        editCell.append(editButton);
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = () => deleteGenre(genre.id);
        const deleteCell = row.insertCell();
        deleteCell.append(deleteButton);
    });
};
const refresh = () => __awaiter(void 0, void 0, void 0, function* () {
    yield getGenres();
    yield getBooks();
});
refresh();
//# sourceMappingURL=script.js.map