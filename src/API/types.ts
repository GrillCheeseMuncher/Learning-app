export interface PokedexApiResponse {
  count: number;
  next: unknown;
  previous: unknown;
  results: PokedexPokemon[];
}

export interface PokedexPokemon {
  name: string;
  url: string;
}
