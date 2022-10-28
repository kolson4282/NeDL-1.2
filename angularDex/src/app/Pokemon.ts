export type Pokemon = {
  sprites: {
    other: {
      'official-artwork': {
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

export type PokemonSpecies = {
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

export type CompositePokemon = {
  pokemon: Pokemon;
  species: PokemonSpecies;
};

export type PokemonSpeciesList = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};
