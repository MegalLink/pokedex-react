import { Box, Image, Text, Badge, HStack, useColorModeValue, ScaleFade } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { TYPE_COLORS } from '../constants/pokemonTypes';

const PokemonCard = ({ pokemon }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Fallback image URL
  const fallbackImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

  return (
    <ScaleFade in={true} initialScale={0.9}>
      <Link to={`/pokemon/${pokemon.id}`} style={{ display: 'block' }}>
        <Box
          bg={bgColor}
          borderRadius="lg"
          p={4}
          shadow="md"
          transition="all 0.3s ease"
          _hover={{
            transform: 'translateY(-4px) scale(1.02)',
            shadow: 'xl',
            cursor: 'pointer'
          }}
          borderWidth="1px"
          borderColor={borderColor}
          position="relative"
        >
          <Image
            src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front || fallbackImage}
            alt={pokemon.name}
            boxSize="200px"
            mx="auto"
            objectFit="contain"
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.05)' }}
            fallback={<Box boxSize="200px" bg="gray.100" borderRadius="lg" />}
          />
          <Text
            fontSize="xl"
            fontWeight="semibold"
            textAlign="center"
            textTransform="capitalize"
            mt={2}
            color={textColor}
          >
            {pokemon.name}
          </Text>
          <HStack spacing={2} justify="center" mt={2}>
            {pokemon.types?.map((type) => (
              <Badge
                key={type}
                px={2}
                py={1}
                bg={TYPE_COLORS[type]}
                color="white"
                borderRadius="full"
                textTransform="capitalize"
              >
                {type}
              </Badge>
            ))}
          </HStack>
        </Box>
      </Link>
    </ScaleFade>
  );
};

export default PokemonCard;
