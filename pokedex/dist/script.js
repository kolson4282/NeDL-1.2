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
const mainContent = document.getElementById("mainContent");
const nextLink = document.getElementById("next");
const prevLink = document.getElementById("previous");
const homeLink = document.getElementById("home");
const brandLink = document.getElementById("brand");
let nextListener;
let prevListener;
const load = (url = "https://pokeapi.co/api/v2/pokemon-species") => __awaiter(void 0, void 0, void 0, function* () {
    mainContent.innerHTML = "";
    const pokemonListResult = yield fetch(url);
    const pokemonList = yield pokemonListResult.json();
    if (pokemonList.next) {
        nextLink === null || nextLink === void 0 ? void 0 : nextLink.classList.remove("d-none");
        nextLink === null || nextLink === void 0 ? void 0 : nextLink.removeEventListener("click", nextListener);
        nextListener = () => load(pokemonList.next);
        nextLink === null || nextLink === void 0 ? void 0 : nextLink.addEventListener("click", nextListener);
    }
    else {
        nextLink === null || nextLink === void 0 ? void 0 : nextLink.classList.add("d-none");
        nextLink === null || nextLink === void 0 ? void 0 : nextLink.removeEventListener("click", nextListener);
        nextListener = () => { };
    }
    if (pokemonList.previous) {
        prevLink === null || prevLink === void 0 ? void 0 : prevLink.classList.remove("d-none");
        prevLink === null || prevLink === void 0 ? void 0 : prevLink.removeEventListener("click", prevListener);
        prevListener = () => load(pokemonList.previous);
        prevLink === null || prevLink === void 0 ? void 0 : prevLink.addEventListener("click", prevListener);
    }
    else {
        prevLink === null || prevLink === void 0 ? void 0 : prevLink.classList.add("d-none");
        prevLink === null || prevLink === void 0 ? void 0 : prevLink.removeEventListener("click", prevListener);
        prevListener = () => { };
    }
    getCompositePokemon(pokemonList).then((list) => list.forEach((p) => (mainContent.innerHTML += pokemonCard(p))));
});
const getCompositePokemon = (list) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = list.results.map((p) => __awaiter(void 0, void 0, void 0, function* () {
        const pokemonSpecies = yield fetch(p.url).then((r) => r.json());
        const pokemon = yield fetch(pokemonSpecies.varieties[0].pokemon.url).then((r) => r.json());
        return { pokemon, pokemonSpecies };
    }));
    const compPokemonList = yield Promise.all(promises).then((list) => list.sort((a, b) => a.pokemonSpecies.id - b.pokemonSpecies.id));
    return compPokemonList;
});
const pokemonCard = ({ pokemon, pokemonSpecies }) => {
    const genera = pokemonSpecies.genera.find((gen) => gen.language.name === "en");
    return `
  <div class="col-xs-6 col-md-4 col-lg-3 col-xxl-2">
    <div class="card" style="height: 100%">
      <img
        src="${pokemon.sprites.other["official-artwork"].front_default}"
        alt="${pokemonSpecies.name}"
        class="card-img-top"
      />
      <div class="card-body">
        <div class="card-title">
          ${pokemonSpecies.id} - ${pokemonSpecies.name}
        </div>
        ${genera &&
        `<div class="card-subtitle mv-2 text-muted">${genera.genus}</div>`}     
      </div>
      <ul
        class="list-group list-group-horizontal justify-content-center"
        style="width: 100%">
        ${pokemon.types
        .map((type) => `<l1 class="list-group-item .flex-fill" style="width: 100%">
                ${type.type.name}
                </l1>`)
        .join("")}
      </ul>
    </div>
  </div>
  `;
};
homeLink === null || homeLink === void 0 ? void 0 : homeLink.addEventListener("click", () => load());
brandLink === null || brandLink === void 0 ? void 0 : brandLink.addEventListener("click", () => load());
load();
