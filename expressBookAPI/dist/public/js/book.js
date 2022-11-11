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
let books = [];
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
    titleInput.value = "";
    authorInput.value = "";
    genreSelect.value = `${genres[0].id}`;
    getBooks();
});
const openBookEdit = (id) => {
    const book = books.find((book) => book.id === id);
    if (!book)
        return console.error("Couldn't find that book");
    const titleEditInput = document.getElementById("edit-book-title");
    titleEditInput.value = book.title;
    const authorEditInput = document.getElementById("edit-book-author");
    authorEditInput.value = book.author;
    const genreEditSelect = document.getElementById("edit-book-genre");
    fillGenreSelect(genreEditSelect);
    genreEditSelect.value = `${book.genreID}`;
    const idEditInput = document.getElementById("edit-book-id");
    idEditInput.value = `${book.id}`;
    const bookEditForm = document.getElementById("bookEditForm");
    bookEditForm.style.display = "block";
    bookEditForm.addEventListener("submit", (e) => updateBook(e));
};
const updateBook = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const titleEdit = document.getElementById("edit-book-title");
    const authorEdit = document.getElementById("edit-book-author");
    const genreEdit = document.getElementById("edit-book-genre");
    const idEdit = document.getElementById("edit-book-id");
    const book = {
        title: titleEdit.value,
        author: authorEdit.value,
        genreID: genreEdit.value,
    };
    yield fetch(`${bookUri}/${idEdit.value}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });
    closeBookEdit();
    getBooks();
});
const closeBookEdit = () => {
    const bookEditForm = document.getElementById("bookEditForm");
    bookEditForm.style.display = "none";
    bookEditForm.removeEventListener("submit", (e) => updateBook(e));
};
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
        editButton.onclick = () => openBookEdit(book.id);
        const editCell = row.insertCell();
        editCell.append(editButton);
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = () => deleteBook(book.id);
        const deleteCell = row.insertCell();
        deleteCell.append(deleteButton);
    });
};
//# sourceMappingURL=book.js.map