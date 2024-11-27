import { Routes as RouterRoutes, Route } from 'react-router-dom';
import PokemonList from '../components/PokemonList';
import PokemonDetail from '../components/PokemonDetail';

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route
        path="/"
        element={<PokemonList />}
      />
      <Route 
        path="/pokemon/:id" 
        element={<PokemonDetail />} 
      />
    </RouterRoutes>
  );
};
