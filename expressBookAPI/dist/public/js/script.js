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