const mainContent = document.getElementById("mainContent") as HTMLElement;
const nextLink = document.getElementById("next");
const prevLink = document.getElementById("previous");
const homeLink = document.getElementById("home");
const brandLink = document.getElementById("brand");

let nextListener: () => void;
let prevListener: () => void;

type PokemonSpeciesList = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

type Pokemon = {
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};

type PokemonSpecies = {
  name: string;
  id: number;
  genera: {
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  varieties: {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

type CompositePokemon = {
  pokemon: Pokemon;
  pokemonSpecies: PokemonSpecies;
};

const load = async (
  url: string = "https://pokeapi.co/api/v2/pokemon-species"
) => {
  mainContent.innerHTML = "";
  const pokemonListResult = await fetch(url);
  const pokemonList: PokemonSpeciesList = await pokemonListResult.json();
  if (pokemonList.next) {
    nextLink?.classList.remove("d-none");
    nextLink?.removeEventListener("click", nextListener);
    nextListener = () => load(pokemonList.next);
    nextLink?.addEventListener("click", nextListener);
  } else {
    nextLink?.classList.add("d-none");
    nextLink?.removeEventListener("click", nextListener);
    nextListener = () => {};
  }
  if (pokemonList.previous) {
    prevLink?.classList.remove("d-none");
    prevLink?.removeEventListener("click", prevListener);
    prevListener = () => load(pokemonList.previous);
    prevLink?.addEventListener("click", prevListener);
  } else {
    prevLink?.classList.add("d-none");
    prevLink?.removeEventListener("click", prevListener);
    prevListener = () => {};
  }
  await getCompositePokemon(pokemonList).then((list) =>
    list.forEach((p) => (mainContent.innerHTML += pokemonCard(p)))
  );
  // compPokemonList.forEach((p) => (mainContent.innerHTML += pokemonCard(p)));
  // console.log(compPokemonList);
};

const getCompositePokemon = async (list: PokemonSpeciesList) => {
  const promises = list.results.map(async (p) => {
    const pokemonSpecies: PokemonSpecies = await fetch(p.url).then((r) =>
      r.json()
    );
    const pokemon: Pokemon = await fetch(
      pokemonSpecies.varieties[0].pokemon.url
    ).then((r) => r.json());
    return { pokemon, pokemonSpecies };
  });
  const compPokemonList: CompositePokemon[] = await Promise.all(promises).then(
    (list) => list.sort((a, b) => a.pokemonSpecies.id - b.pokemonSpecies.id)
  );
  return compPokemonList;
};

const pokemonCard = ({ pokemon, pokemonSpecies }: CompositePokemon): string => {
  const genera = pokemonSpecies.genera.find(
    (gen) => gen.language.name === "en"
  );

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
        ${
          genera &&
          `<div class="card-subtitle mv-2 text-muted">${genera.genus}</div>`
        }     
      </div>
      <ul
        class="list-group list-group-horizontal justify-content-center"
        style="width: 100%">
        ${pokemon.types
          .map(
            (type) =>
              `<l1 class="list-group-item .flex-fill" style="width: 100%">
                ${type.type.name}
                </l1>`
          )
          .join("")}
      </ul>
    </div>
  </div>
  `;
};

homeLink?.addEventListener("click", () => load());
brandLink?.addEventListener("click", () => load());
load();
