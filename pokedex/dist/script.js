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
const load = () => __awaiter(void 0, void 0, void 0, function* () {
    const pokemonListResult = yield fetch("https://pokeapi.co/api/v2/pokemon-species");
    const pokemonList = yield pokemonListResult.json();
    yield getCompositePokemon(pokemonList).then((list) => list.forEach((p) => (mainContent.innerHTML += pokemonCard(p))));
    // compPokemonList.forEach((p) => (mainContent.innerHTML += pokemonCard(p)));
    // console.log(compPokemonList);
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
load();
