const mainContent = document.getElementById("mainContent") as HTMLElement;
const nextLink = document.getElementById("next"); //Link to get next page of pokemon
const prevLink = document.getElementById("previous"); //Link to get previous page of pokemon
const homeLink = document.getElementById("home");
const brandLink = document.getElementById("brand");

//I needed to save the listener function so that I could remove them from the Next/Previous links before adding the new ones from the new page.
let nextListener: () => void;
let prevListener: () => void;

//Initial list of pokemon to display on a page
type PokemonSpeciesList = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

//Pokemon information is split between two calls. One for Pokemon and one for Pokemon Species. These are the types for those.
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

//created this type to make the foreach loops look cleaner, and make it easier to pass into the function to get the Card html.
type CompositePokemon = {
  pokemon: Pokemon;
  pokemonSpecies: PokemonSpecies;
};

//called on page load, as well as in the click listners. Default URL returns 1-20.
//This function gets the inital list to display, assigns the click listeners to the navigation, and then gets and displays the details of the pokemon.
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
  getCompositePokemon(pokemonList).then((list) =>
    list.forEach((p) => (mainContent.innerHTML += pokemonCard(p)))
  );
};

//Made this it's own function as I was spinning my head trying to get these to print in order.
//Did a promise.all so I could sort the list after all of the data had been retrieved.
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

//returns a string representing a pokemon card to display in the main content of the site.
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

/* ---------- On Page Load Stuff ----------------- */
homeLink?.addEventListener("click", () => load());
brandLink?.addEventListener("click", () => load());
load();
