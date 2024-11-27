import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { usePokemonList, usePokemonSearch, useTypes, usePokemonsByType } from '../state/pokemonQueries';

export const usePokemonListLogic = (limit = 12) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const toast = useToast();

  const {
    data: types,
    isLoading: isLoadingTypes,
  } = useTypes();

  const {
    data: pokemonListData,
    isLoading: isLoadingList,
    error: listError,
  } = usePokemonList(currentPage, limit);

  const {
    data: typeData,
    isLoading: isLoadingType,
  } = usePokemonsByType(selectedType, currentPage);

  const {
    data: searchResult,
    isLoading: isSearching,
    error: searchError,
  } = usePokemonSearch(searchQuery);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchTerm.trim());
    setCurrentPage(1);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    setSearchTerm('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const clearTypeFilter = () => {
    setSelectedType('');
    setCurrentPage(1);
  };

  const isLoading = isLoadingList || isSearching || isLoadingType || isLoadingTypes;
  const error = listError || searchError;

  let data;
  let hasMore = false;
  let totalPages = 0;

  if (searchQuery) {
    data = { pokemons: searchResult ? [searchResult] : [], count: searchResult ? 1 : 0 };
    hasMore = false;
    totalPages = 1;
  } else if (selectedType) {
    data = typeData || { pokemons: [], count: 0 };
    hasMore = typeData?.hasMore ?? false;
    totalPages = typeData ? typeData.totalPages : 0;
  } else {
    data = pokemonListData || { pokemons: [], count: 0 };
    hasMore = currentPage * limit < data.count;
    totalPages = Math.ceil(data.count / limit);
  }

  const isLastPage = !hasMore;

  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to fetch Pokemon data. Please try again later.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }

  return {
    currentPage,
    searchTerm,
    selectedType,
    types,
    data,
    totalPages,
    isLastPage,
    isLoading,
    error,
    handleSearch,
    handleSearchSubmit,
    handleSearchKeyPress,
    clearSearch,
    handlePageChange,
    handleTypeChange,
    clearTypeFilter,
  };
};
