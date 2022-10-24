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
const paragraphs = document.getElementById("paragraphs");
const typeSelect = document.getElementById("typeSelect");
const fillData = () => __awaiter(void 0, void 0, void 0, function* () {
    list.innerHTML = "";
    jsonContainer.innerHTML = "";
    const ipsum = (yield getIpsum(paragraphs.value, typeSelect.value));
    ipsum.forEach((line) => {
        const p = document.createElement("p");
        p.innerText = line;
        list.append(p);
    });
    jsonContainer.append(JSON.stringify(ipsum));
});
const getIpsum = (paras = "5", type = "meat-and-filler") => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetch(`https://baconipsum.com/api/?type=${type}&paras=${paras}`);
    return result.json();
});
