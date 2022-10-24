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
const list = document.getElementById("ipsumList");
const jsonContainer = document.getElementById("json");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const ipsum = (yield getIpsum());
    ipsum.forEach((line) => {
        const li = document.createElement("p");
        li.innerText = line;
        list === null || list === void 0 ? void 0 : list.append(li);
    });
    jsonContainer === null || jsonContainer === void 0 ? void 0 : jsonContainer.append(JSON.stringify(ipsum));
});
const getIpsum = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=3&start-with-lorem=1");
    return result.json();
});
start();
