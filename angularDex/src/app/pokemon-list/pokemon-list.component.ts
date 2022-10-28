import { Component, OnInit } from '@angular/core';
import { CompositePokemon } from '../Pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  bulbasaur: CompositePokemon = {
    pokemon: {
      sprites: {
        other: {
          'official-artwork': {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          },
        },
      },
      types: [
        {
          slot: 1,
          type: {
            name: 'grass',
            url: '',
          },
        },
        {
          slot: 2,
          type: {
            name: 'poison',
            url: '',
          },
        },
      ],
    },
    species: {
      name: 'bulbasaur',
      id: 1,
      genera: [
        {
          genus: 'たねポケモン',
          language: {
            name: 'ja',
            url: '',
          },
        },
        {
          genus: 'Seed Pokemon',
          language: {
            name: 'en',
            url: 'string',
          },
        },
      ],
      varieties: [
        {
          is_default: true,
          pokemon: {
            name: 'bulbasaur',
            url: '',
          },
        },
      ],
    },
  };
  constructor() {}

  ngOnInit(): void {}
}
