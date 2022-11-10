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
const genreUri = "api/genres";
let genres = [];
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
    nameInput.value = "";
    refresh();
});
const openGenreEdit = (id) => {
    const genre = genres.find((genre) => genre.id === id);
    if (!genre)
        return console.error("Couldn't find that genre");
    const nameEditInput = document.getElementById("edit-genre-name");
    nameEditInput.value = genre.name;
    const genreEditInput = document.getElementById("edit-genre-id");
    genreEditInput.value = `${genre.id}`;
    const genreEditForm = document.getElementById("genreEditForm");
    genreEditForm.style.display = "block";
    genreEditForm.addEventListener("submit", (e) => updateGenre(e));
};
const updateGenre = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const nameEdit = document.getElementById("edit-genre-name");
    const idEdit = document.getElementById("edit-genre-id");
    const genre = {
        name: nameEdit.value,
    };
    yield fetch(`${genreUri}/${idEdit.value}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(genre),
    });
    closeGenreEdit();
    refresh();
});
const closeGenreEdit = () => {
    const genreEditForm = document.getElementById("genreEditForm");
    genreEditForm.style.display = "none";
    genreEditForm.removeEventListener("submit", (e) => updateGenre(e));
};
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
        editButton.onclick = () => openGenreEdit(genre.id);
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
//# sourceMappingURL=genre.js.map