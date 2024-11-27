import {
  SimpleGrid,
  Center,
  Spinner,
  Input,
  VStack,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  Container,
  Box,
  Heading,
  Select,
  HStack,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import PokemonCard from './PokemonCard';
import Pagination from './Pagination';
import { usePokemonListLogic } from '../hooks/usePokemonListLogic';

const PokemonList = () => {
  const {
    currentPage,
    searchTerm,
    selectedType,
    types,
    data,
    totalPages,
    isLastPage,
    isLoading,
    handleSearch,
    clearSearch,
    handlePageChange,
    handleTypeChange,
    clearTypeFilter,
    handleSearchSubmit,
    handleSearchKeyPress,
  } = usePokemonListLogic();

  return (
    <Container maxW="container.xl">
      <Box py={8}>
        <Heading textAlign="center" mb={8}>Pokédex</Heading>
        <VStack spacing={6} w="full" p={6}>
          <HStack spacing={4} w="full" maxW="container.md">
            <form style={{ flex: 1 }} onSubmit={e => {
              e.preventDefault();
              handleSearchSubmit();
            }}>
              <InputGroup>
                <Input
                  placeholder="Search Pokemon by name..."
                  value={searchTerm}
                  onChange={handleSearch}
                  onKeyPress={handleSearchKeyPress}
                  isDisabled={isLoading}
                />
                <InputRightElement width="4.5rem">
                  {searchTerm && (
                    <IconButton
                      h="1.75rem"
                      size="sm"
                      onClick={clearSearch}
                      icon={<CloseIcon />}
                      marginRight="2"
                      isDisabled={isLoading}
                    />
                  )}
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    icon={<SearchIcon />}
                    onClick={handleSearchSubmit}
                    isDisabled={isLoading}
                  />
                </InputRightElement>
              </InputGroup>
            </form>
            
            <Select
              value={selectedType}
              onChange={handleTypeChange}
              placeholder="Filter by type"
              maxW="200px"
              textTransform="capitalize"
              isDisabled={isLoading || Boolean(searchTerm)}
            >
              {types?.map(type => (
                <option key={type.url} value={type.name}>
                  {type.name}
                </option>
              ))}
            </Select>

            {selectedType && (
              <IconButton
                icon={<CloseIcon />}
                onClick={clearTypeFilter}
                size="sm"
                aria-label="Clear type filter"
                isDisabled={isLoading}
              />
            )}
          </HStack>

          {isLoading ? (
            <Center h="50vh">
              <Spinner size="xl" />
            </Center>
          ) : (
            <>
              {!data.pokemons || data.pokemons.length === 0 ? (
                <Text>No Pokemon found</Text>
              ) : (
                <>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
                    {data.pokemons.map((pokemon) => (
                      <PokemonCard 
                        key={pokemon.id} 
                        pokemon={pokemon} 
                      />
                    ))}
                  </SimpleGrid>
                  {!searchTerm && totalPages > 0 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      isLastPage={isLastPage}
                    />
                  )}
                </>
              )}
            </>
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default PokemonList;
