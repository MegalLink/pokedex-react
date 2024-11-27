import { useParams } from 'react-router-dom';
import { usePokemonDetails } from '../state/pokemonQueries';

export const usePokemonDetailLogic = () => {
  const { id } = useParams();
  
  const {
    data: pokemon,
    isLoading,
    error,
  } = usePokemonDetails(id);

  // Formatea las habilidades para mostrar
  const formatAbilities = (abilities) => {
    if (!abilities) return [];
    
    return abilities.map(ability => ({
      name: ability.name,
      description: ability.description,
      isHidden: ability.isHidden,
    }));
  };

  return {
    pokemon,
    isLoading,
    error,
    abilities: pokemon ? formatAbilities(pokemon.abilities) : [],
  };
};
