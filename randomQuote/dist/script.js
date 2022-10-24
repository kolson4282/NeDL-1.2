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
const contentDiv = document.getElementById("content");
const authorDiv = document.getElementById("author");
const form = document.getElementById("userInput");
const minLengthInput = document.getElementById("minLength");
const maxLengthInput = document.getElementById("maxLength");
const show = document.getElementById("show");
const json = document.getElementById("json");
const displayQuote = (min, max) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetch(`https://api.quotable.io/random?minLength=${min}&maxLength=${max}`);
    const data = yield result.json();
    contentDiv.innerText = data.content;
    authorDiv.innerText = data.author;
    json.innerText = JSON.stringify(data);
});
const onSubmit = (e) => {
    e.preventDefault();
    displayQuote(minLengthInput.value, maxLengthInput.value);
    minLengthInput.focus();
};
form.addEventListener("submit", onSubmit);
show.addEventListener("click", () => {
    json.classList.toggle("hidden");
    show.innerText = show.innerText === "Show JSON" ? "Hide JSON" : "Show JSON";
});
//# sourceMappingURL=script.js.map