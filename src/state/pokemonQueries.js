import { useQuery } from '@tanstack/react-query';
import { pokemonAPI } from '../effects/pokemonAPI';

export const usePokemonList = (page, limit = 20) => {
  const offset = (page - 1) * limit;
  return useQuery({
    queryKey: ['pokemonList', page],
    queryFn: () => pokemonAPI.getPokemons(limit, offset),
    staleTime: 300000, // 5 minutes
  });
};

export const usePokemonSearch = (searchTerm) => {
  return useQuery({
    queryKey: ['pokemonSearch', searchTerm],
    queryFn: () => {
      if (!searchTerm?.trim()) return null;
      return pokemonAPI.searchPokemon(searchTerm);
    },
    enabled: Boolean(searchTerm?.trim()),
    staleTime: 300000,
  });
};

export const usePokemonDetails = (id) => {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => pokemonAPI.getPokemonDetails(id),
    staleTime: 300000,
  });
};

export const useTypes = () => {
  return useQuery({
    queryKey: ['types'],
    queryFn: pokemonAPI.getTypes,
    staleTime: Infinity, // Types don't change
  });
};

export const usePokemonsByType = (type, page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['pokemonsByType', type, page],
    queryFn: () => pokemonAPI.getPokemonsByType(type, page, limit),
    enabled: Boolean(type),
    staleTime: 300000,
  });
};
