import {
  Box,
  Container,
  Image,
  Text,
  VStack,
  HStack,
  Heading,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Spinner,
  Center,
  Divider,
  List,
  ListItem,
  ListIcon,
  Tooltip,
  Button,
  SlideFade,
  Fade,
} from '@chakra-ui/react';
import { StarIcon, InfoIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { usePokemonDetailLogic } from '../hooks/usePokemonDetailLogic';
import { TYPE_COLORS } from '../constants/pokemonTypes';
import { useNavigate } from 'react-router-dom';

const PokemonDetail = () => {
  const { pokemon, isLoading, abilities } = usePokemonDetailLogic();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!pokemon) {
    return (
      <Center h="100vh">
        <Text>Pokemon not found</Text>
      </Center>
    );
  }

  return (
    <Fade in={true}>
      <Container maxW="container.lg" py={8}>
        <Button
          leftIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          mb={6}
          variant="ghost"
          size="lg"
          transition="all 0.3s ease"
          _hover={{
            transform: 'translateX(-4px)',
            bg: 'gray.100'
          }}
        >
          Back
        </Button>
        
        <VStack spacing={8} align="stretch">
          <SlideFade in={true} offsetY="20px">
            {/* Header con nombre y tipos */}
            <HStack justify="space-between" align="center">
              <Heading textTransform="capitalize">{pokemon.name}</Heading>
              <HStack spacing={2}>
                {pokemon.types.map(type => (
                  <Badge
                    key={type}
                    px={3}
                    py={1}
                    borderRadius="full"
                    bg={TYPE_COLORS[type]}
                    color="white"
                    textTransform="capitalize"
                  >
                    {type}
                  </Badge>
                ))}
              </HStack>
            </HStack>
          </SlideFade>

          {/* Imágenes y stats básicos */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <SlideFade in={true} offsetY="20px" delay={0.2}>
              <Box>
                <Image
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  w="full"
                  h="auto"
                  fallbackSrc="https://via.placeholder.com/400"
                  transition="transform 0.3s ease"
                  _hover={{ transform: 'scale(1.05)' }}
                />
              </Box>
            </SlideFade>

            <VStack align="stretch" spacing={6}>
              <SlideFade in={true} offsetY="20px" delay={0.3}>
                {/* Stats básicos */}
                <SimpleGrid columns={2} spacing={4}>
                  <Stat>
                    <StatLabel>Height</StatLabel>
                    <StatNumber>{pokemon.height}m</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Weight</StatLabel>
                    <StatNumber>{pokemon.weight}kg</StatNumber>
                  </Stat>
                </SimpleGrid>
              </SlideFade>

              <Divider />

              <SlideFade in={true} offsetY="20px" delay={0.4}>
                {/* Habilidades */}
                <Box>
                  <Heading size="md" mb={4}>Abilities</Heading>
                  <List spacing={3}>
                    {abilities.map((ability, index) => (
                      <ListItem key={index}>
                        <HStack>
                          <ListIcon as={ability.isHidden ? StarIcon : InfoIcon} color="blue.500" />
                          <Text textTransform="capitalize" fontWeight="bold">
                            {ability.name}
                          </Text>
                          {ability.isHidden && (
                            <Badge colorScheme="purple" ml={2}>Hidden</Badge>
                          )}
                        </HStack>
                        <Text fontSize="sm" color="gray.600" mt={1} ml={6}>
                          {ability.description}
                        </Text>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </SlideFade>

              <Divider />

              <SlideFade in={true} offsetY="20px" delay={0.5}>
                {/* Stats */}
                <Box>
                  <Heading size="md" mb={4}>Base Stats</Heading>
                  <SimpleGrid columns={2} spacing={4}>
                    {pokemon.stats.map((stat, index) => (
                      <Stat key={index}>
                        <StatLabel textTransform="capitalize">
                          {stat.name.replace('-', ' ')}
                        </StatLabel>
                        <StatNumber>{stat.value}</StatNumber>
                      </Stat>
                    ))}
                  </SimpleGrid>
                </Box>
              </SlideFade>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Fade>
  );
};

export default PokemonDetail;
