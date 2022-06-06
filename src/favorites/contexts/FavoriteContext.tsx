import React, { Children, useState } from 'react';
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail';

interface FavoriteContextProps {
    favorites: PokemonDetail[];
    setFavorites: React.Dispatch<React.SetStateAction<PokemonDetail[]>>

}
export const FavoriteContext = React.createContext<FavoriteContextProps>({
    favorites: [],
    setFavorites: () => console.warn(`setFavorites is not ready`)
})

export const FavoriteProvider: React.FC = ({ children }) => {
    const [favorites, setFavorites] = useState<PokemonDetail[]>([]);
    return (
        <FavoriteContext.Provider value={{
            favorites,
            setFavorites,
        }}>
            {children}
        </FavoriteContext.Provider>
    );
};

