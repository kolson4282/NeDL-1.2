import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { PokemonSpeciesList } from '../Pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemonList?: PokemonSpeciesList;

  constructor(private pokeAPIService: PokeapiService) {}

  getPokemonList() {
    this.pokeAPIService
      .getFromEndpoint<PokemonSpeciesList>('pokemon-species')
      .subscribe((list) => (this.pokemonList = list));
  }

  ngOnInit(): void {
    this.getPokemonList();
  }
}
