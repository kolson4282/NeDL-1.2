import { Component, Input, OnInit } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { Pokemon, PokemonSpecies } from '../Pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent implements OnInit {
  @Input() speciesUrl: string = '';
  pokemon?: Pokemon;
  species?: PokemonSpecies;

  constructor(private pokeapi: PokeapiService) {}

  getPokemonSpecies() {
    this.pokeapi.getFromURL<PokemonSpecies>(this.speciesUrl).subscribe((s) => {
      this.species = s;
      this.getPokemon();
    });
  }

  getPokemon() {
    this.pokeapi
      .getFromURL<Pokemon>(this.species?.varieties[0].pokemon.url || '')
      .subscribe((p) => (this.pokemon = p));
  }

  ngOnInit(): void {
    this.getPokemonSpecies();
  }
}
