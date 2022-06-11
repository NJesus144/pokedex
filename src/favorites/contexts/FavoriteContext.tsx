import React, { useState } from 'react';
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail';

interface FavoriteContextProps {
    favorites: PokemonDetail[];
    setFavorites: React.Dispatch<React.SetStateAction<PokemonDetail[]>>

}
export const FavoriteContext = React.createContext<FavoriteContextProps>({
    favorites: [],
    
    setFavorites: () => console.warn(`setFavorites is not ready`)
})
interface FavoriteProviderProps {
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | null
}

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children }) => {
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

