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
const tagSelect = document.getElementById("tags");
const clearButton = document.getElementById("clear");
const show = document.getElementById("show");
const json = document.getElementById("json");
const displayQuote = (min, max, tags = "") => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetch(`https://api.quotable.io/random?minLength=${min}&maxLength=${max}&tags=${tags}`);
    const data = yield result.json();
    contentDiv.innerText = data.content || data.statusMessage || "";
    authorDiv.innerText =
        (data.author ? "- " + data.author : "") +
            (data.length ? " (Length: " + data.length + ")" : "");
    json.innerText = JSON.stringify(data);
});
const onSubmit = (e) => {
    e.preventDefault();
    const options = Array.from(tagSelect.options);
    const selected = [];
    options.forEach((option) => {
        if (option.selected) {
            selected.push(option.value);
        }
    });
    displayQuote(minLengthInput.value, maxLengthInput.value, selected.join(","));
    minLengthInput.focus();
};
const fillSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetch("https://api.quotable.io/tags");
    const data = yield result.json();
    data.forEach((tag) => {
        const option = document.createElement("option");
        option.value = tag.name;
        option.innerText = tag.name;
        tagSelect.append(option);
    });
});
form.addEventListener("submit", onSubmit);
show.addEventListener("click", () => {
    json.classList.toggle("hidden");
    show.innerText = show.innerText === "Show JSON" ? "Hide JSON" : "Show JSON";
});
clearButton.addEventListener("click", (e) => {
    e.preventDefault();
    tagSelect.value = "";
});
fillSubmit();
//# sourceMappingURL=script.js.map