import axios from 'axios';
import { Pokemon, PokemonList } from '../models/Pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

const extractIdFromUrl = (url) => {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? parseInt(matches[1]) : null;
};

export const pokemonAPI = {
  async getPokemons(limit = 12, offset = 0) {
    const response = await axios.get(`${BASE_URL}/pokemon`, {
      params: { limit, offset }
    });

    // Fetch details for each Pokemon
    const detailsPromises = response.data.results.map(pokemon => {
      const id = extractIdFromUrl(pokemon.url);
      return axios.get(`${BASE_URL}/pokemon/${id}`).then(res => Pokemon.fromAPI(res.data));
    });

    const pokemonDetails = await Promise.all(detailsPromises);

    return {
      pokemons: pokemonDetails,
      count: response.data.count
    };
  },

  async getPokemonDetails(nameOrId) {
    try {
      if (!nameOrId) {
        throw new Error('Pokemon ID or name is required');
      }

      const response = await axios.get(
        `${BASE_URL}/pokemon/${nameOrId.toString().toLowerCase()}`
      );

      // Obtener detalles de las habilidades
      const abilitiesPromises = response.data.abilities.map(async (abilityData) => {
        const abilityResponse = await axios.get(abilityData.ability.url);
        const englishDescription = abilityResponse.data.effect_entries.find(
          entry => entry.language.name === 'en'
        );
        
        return {
          name: abilityData.ability.name,
          description: englishDescription?.effect || 'No description available',
          isHidden: abilityData.is_hidden,
        };
      });

      const abilities = await Promise.all(abilitiesPromises);
      const pokemonData = response.data;
      
      // Combinar los datos del Pokémon con las habilidades detalladas
      return Pokemon.fromAPI({
        ...pokemonData,
        abilities: abilities,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  },

  async searchPokemon(name) {
    try {
      if (!name?.trim()) {
        return null;
      }

      const response = await axios.get(
        `${BASE_URL}/pokemon/${name.toLowerCase()}`
      );
      return Pokemon.fromAPI(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  },

  async getTypes() {
    const response = await axios.get(`${BASE_URL}/type`);
    return response.data.results.filter(type =>
      type.name !== 'unknown' && type.name !== 'stellar'
    );
  },

  async getPokemonsByType(type, page = 1, limit = 12) {
    if (!type) return null;
    const response = await axios.get(`${BASE_URL}/type/${type}`);
    const pokemonList = response.data.pokemon;
    const totalCount = pokemonList.length;
    
    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedList = pokemonList.slice(startIndex, endIndex);

    // If there are no Pokémon in this page, return empty result
    if (paginatedList.length === 0) {
      return {
        pokemons: [],
        count: totalCount,
        hasMore: false,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit)
      };
    }

    // Get detailed information for each Pokemon
    const detailsPromises = paginatedList.map(p => 
      axios.get(p.pokemon.url).then(res => Pokemon.fromAPI(res.data))
    );

    const pokemonDetails = await Promise.all(detailsPromises);
    return {
      pokemons: pokemonDetails,
      count: totalCount,
      hasMore: endIndex < totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    };
  }
};
