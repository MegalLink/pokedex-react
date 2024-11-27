export class Pokemon {
  constructor({
    id,
    name,
    types,
    height,
    weight,
    sprites,
    abilities,
    stats,
  }) {
    this.id = id;
    this.name = name;
    this.types = types;
    this.height = height;
    this.weight = weight;
    this.sprites = sprites;
    this.abilities = abilities;
    this.stats = stats;
  }

  static fromAPI(data) {
    return new Pokemon({
      id: data.id,
      name: data.name,
      types: data.types.map(type => type.type.name),
      height: data.height / 10, // Convertir a metros
      weight: data.weight / 10, // Convertir a kilogramos
      sprites: {
        front: data.sprites.front_default,
        back: data.sprites.back_default,
        frontShiny: data.sprites.front_shiny,
        backShiny: data.sprites.back_shiny,
        other: data.sprites.other
      },
      abilities: Array.isArray(data.abilities) ? data.abilities : 
        data.abilities?.map(ability => ({
          name: ability.ability ? ability.ability.name : ability.name,
          description: ability.description || '',
          isHidden: ability.is_hidden || false,
        })) || [],
      stats: data.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
    });
  }
}

export class PokemonList {
  constructor(data) {
    if (!data?.results) {
      throw new Error('Invalid Pokemon list data');
    }

    this.pokemons = data.results.map(pokemon => ({
      name: pokemon.name,
      url: pokemon.url
    }));
    this.count = data.count || 0;
    this.next = data.next || null;
    this.previous = data.previous || null;
  }

  static fromAPI(data) {
    if (!data) {
      throw new Error('Cannot create PokemonList from null data');
    }
    return new PokemonList(data);
  }
}
