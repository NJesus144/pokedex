import React, { useContext, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { FavoriteContext } from "./FavoriteContext";
import PokedexCard from "../../pokedex/components/PokedexCard";
import { PokemonDetail } from "../../pokemon/interfaces/PokemonDetail";



interface PokedexProps {}

export const Pokedex: React.FC<PokedexProps> = () => {

  const navigate = useNavigate();
  const {favorites} = useContext(FavoriteContext);

  
//    useEffect(() => {
//   listPokemon().then((response) => setPokemons(response.results));
//  }, []);




const handleBackButton = () => {
  navigate(-1)
}
  return (
    <div className="p-4">
        <div className="bg-red-500 rounded-md flex pt-4 flex-col justify-center items-center">
                <h1 className="styleCss text-white  text-5xl">Favorite Pokémons</h1>
                  <div className="bg-white border-b-2 rounded-b-md border-l-2 border-r-2 h-16 w-full">                  
                    
                    <div className="h-2 bg-black flex items-center justify-center rounded-r-sm">
                      <div className="h-8 w-8 bg-white border-black border-4 rounded-2xl"></div>
                    </div>  
                    <div className="lg:max-w-4xl m-auto">
                       <button className="border-0  mt-2 p-1 px-6  bg-sky-600 text-white font-bold rounded-xl" onClick={handleBackButton}>Back</button> 
                        </div>                
                  </div>           
            </div>
          <div  className=" sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mt-4 m-auto ">   
              <div  className="grid sm:grid-cols-1 gap-4 md:grid-cols-2  xl:grid-cols-3">
              {favorites?.map((pokemon) => (         
              <PokedexCard 
              pokemon={pokemon}
              />     
                ))}
            </div>
          </div>  
    </div>
  );
};
export default Pokedex;
