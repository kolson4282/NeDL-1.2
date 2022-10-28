"use strict";
const mainContent = document.getElementById("mainContent");
const bulbasaur = {
    pokemon: {
        sprites: {
            other: {
                "official-artwork": {
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
                },
            },
        },
        types: [
            {
                slot: 1,
                type: {
                    name: "grass",
                    url: "",
                },
            },
        ],
    },
    pokemonSpecies: {
        name: "bulbasaur",
        id: 1,
        genera: [
            {
                genus: "たねポケモン",
                language: {
                    name: "ja",
                    url: "",
                },
            },
            {
                genus: "Seed Pokemon",
                language: {
                    name: "en",
                    url: "string",
                },
            },
        ],
    },
};
const load = () => {
    for (let i = 0; i < 12; i++) {
        mainContent.innerHTML += pokemonCard(bulbasaur);
    }
};
const pokemonCard = ({ pokemon, pokemonSpecies }) => {
    const genera = pokemonSpecies.genera.find((gen) => gen.language.name === "en");
    return `<div class="col-xs-6 col-md-4 col-lg-3 col-xxl-2">
<div class="card">
  <img
    src="${pokemon.sprites.other["official-artwork"].front_default}"
    alt="${pokemonSpecies.name}"
    class="card-img-top"
  />
  <div class="card-body">
    <div class="card-title">${pokemonSpecies.name}</div>
    ${genera &&
        `<div class="card-subtitle mv-2 text-muted">${genera.genus}</div>`}
  </div>
  <ul
    class="list-group list-group-horizontal justify-content-center"
    style="width: 100%"
  >${pokemon.types
        .map((type) => `<l1 class="list-group-item .flex-fill" style="width: 100%"
        >${type.type.name}</l1
      >`)
        .join("")}
  </ul>
</div>
</div>`;
};
load();
