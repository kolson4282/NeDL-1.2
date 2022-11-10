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
const addBook = () => __awaiter(void 0, void 0, void 0, function* () {
    const titleInput = document.getElementById("add-book-title");
    const authorInput = document.getElementById("add-book-author");
    const genreSelect = document.getElementById("add-book-genre");
    const book = {
        title: titleInput.value,
        author: authorInput.value,
        genreID: genreSelect.value,
    };
    yield fetch(bookUri, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });
    getBooks();
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch(`${bookUri}/${id}`, { method: "DELETE" });
    refresh();
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
        deleteButton.onclick = () => deleteBook(book.id);
        const deleteCell = row.insertCell();
        deleteCell.append(deleteButton);
    });
};
const getGenres = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(genreUri);
    genres = yield response.json();
    displayGenres();
});
const addGenre = () => __awaiter(void 0, void 0, void 0, function* () {
    const nameInput = document.getElementById("add-genre-name");
    const genre = {
        name: nameInput.value,
    };
    yield fetch(genreUri, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(genre),
    });
    refresh();
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
    fillGenreSelect(document.getElementById("add-book-genre"));
};
const fillGenreSelect = (select) => {
    select.innerHTML = "";
    genres.forEach((genre) => {
        const option = document.createElement("option");
        option.value = `${genre.id}`;
        option.innerText = genre.name;
        select.append(option);
    });
};
const refresh = () => __awaiter(void 0, void 0, void 0, function* () {
    yield getGenres();
    yield getBooks();
});
refresh();
const bookAddForm = document.getElementById("bookAddForm");
bookAddForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addBook();
});
const genreAddForm = document.getElementById("genreAddForm");
genreAddForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addGenre();
});
//# sourceMappingURL=script.js.map