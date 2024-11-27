import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemons = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon`, {
      params: {
        limit,
        offset,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw error;
  }
};

export const getPokemonDetails = async (nameOrId) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pokemon ${nameOrId}:`, error);
    throw error;
  }
};

export const searchPokemon = async (name) => {
  try {
    if (!name.trim()) return null;
    const response = await axios.get(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching pokemon ${name}:`, error);
    return null;
  }
};
