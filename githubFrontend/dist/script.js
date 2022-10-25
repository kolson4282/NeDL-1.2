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
const form = document.querySelector("form");
const userIDInput = document.getElementById("userID");
const repoList = document.getElementById("repos");
const repoInfo = document.getElementById("repoInfo");
const getInfo = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield fetch(`https://api.github.com/users/${user}/repos`);
    const data = yield results.json();
    data.forEach((repo) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.innerText = repo.name;
        button.onclick = () => {
            repoInfo.innerHTML = "";
            getRepoInfo(repo.contents_url.replace("{+path}", ""), repo.name);
        };
        li.append(button);
        repoList.append(li);
    });
});
const getRepoInfo = (repoURL, repoName) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield fetch(repoURL);
    const contents = yield results.json();
    const div = document.createElement("div");
    repoInfo.innerHTML += `<h2>${repoName}</h2>`;
    contents.forEach((file) => {
        const button = document.createElement("button");
        button.innerText = file.name;
        button.onclick = () => {
            div.innerText = "";
            getFileInfo(file, div, repoInfo);
        };
        repoInfo.append(button);
    });
});
const getFileInfo = (file, div, parentDiv) => __awaiter(void 0, void 0, void 0, function* () {
    div.innerHTML += `<h2>${file.name}</h2>`;
    parentDiv.append(div);
    const nextDiv = document.createElement("div");
    console.log(file);
    if (file.type == "file") {
        const results = yield fetch(file.download_url);
        const contents = yield results.text();
        const p = document.createElement("p");
        p.innerText = contents;
        p.classList.add("code");
        div.append(p);
    }
    else {
        const results = yield fetch(file.url);
        const contents = yield results.json();
        contents.forEach((file) => {
            const button = document.createElement("button");
            button.innerText = file.name;
            button.onclick = () => {
                nextDiv.innerText = "";
                getFileInfo(file, nextDiv, div);
            };
            div.append(button);
        });
    }
});
const submit = (e) => {
    e.preventDefault();
    repoList.innerHTML = "";
    repoInfo.innerHTML = "";
    getInfo(userIDInput.value);
};
form.onsubmit = submit;
//# sourceMappingURL=script.js.map