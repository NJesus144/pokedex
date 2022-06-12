import React, { useContext, useEffect, useState } from "react";
import {listPokemon,} from "../pokemon/services/listPokemons";
import { PokemonDetail, Species } from "../pokemon/interfaces/PokemonDetail";
import {  useNavigate } from "react-router-dom";
import PokedexCard from "./components/PokedexCard";
import Searchbar from './components/Searchbar'
import { getPokemonData, getPokemonsPage, searchPokemon } from "../pokemon/services/api";
import Pagination from "./components/Pagination";
import { useQuery } from "react-query";
import { FavoriteContext } from "../favorites/contexts/FavoriteContext";




interface PokedexProps {}

export const Pokedex: React.FC<PokedexProps> = () => {

  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [notFound, setNotFound] = useState(false)
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const {favorites} = useContext(FavoriteContext);
  const { data } = useQuery(`listPokemon`, listPokemon);
  const favoriteCount = favorites.length

//    useEffect(() => {
//   listPokemon().then((response) => setPokemons(response.results));
//  }, []);


 const itensPerPage = 25;

 const pagePokemon = async ()=> {
   try{
     const pokeData = await getPokemonsPage(itensPerPage, itensPerPage * page);
     const promises = pokeData?.data.results.map(async(pokemon: Species)=>{
       return await getPokemonData(pokemon.url)
     })
   const resultsPromises = await Promise.all(promises);
   setPokemons(resultsPromises)
   setTotalPages(Math.ceil(pokeData?.data.count / itensPerPage));
   } catch (error){
     console.log("pagePokemon error:", error);
   }
   } ;
 
 useEffect(() => {
   pagePokemon();
 }, [page]);


 const onSearchHandler = async (pokemon: PokemonDetail) => {
  if(!pokemon) {
    return  data?.results;
  }
  setNotFound(false);
  const result = await searchPokemon(pokemon);
  
  if(!result){
    setNotFound(true);
  }else {
    setPokemons([result])
    setPage(0);
    setTotalPages(1);
  }
}

const pushFavorites = ()=> {
  navigate('/favorites')
}
const handleBackButton = () => {
  navigate(0)
}

  return (
    <div className="p-4">
            <div className="bg-red-500 rounded-md flex flex-col justify-center items-center">
                <img 
                    src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                    alt="pokeapi-logo"
                    width={200}
                  />
                  <div className="bg-white border-b-2 rounded-b-md border-l-2 border-r-2 h-16 w-full">
                    
                    <div className="h-2 bg-black flex items-center justify-center rounded-r-sm">
                      <div className="h-8 w-8 bg-white border-black border-4 rounded-2xl"></div>
                    </div>                    
                        <div className="flex relative  p-2 items-center mt-2 justify-end md:mr-32 mr- lg:mr-96 ">                        
                            <button onClick={pushFavorites} className="styleCss p-2  rounded-2xl">Favorites ❤️</button>         
                            <div className="absolute top-2 right-1  w-5 h-5 flex items-center justify-center rounded-xl">
                            {favoriteCount  > 0?favoriteCount: '' }
                            </div> 
                        </div>
                  </div>   
            </div>
            <div className="flex sm:max-w-lg  md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-screen-2xl mt-4 max-w-full m-auto justify-center">
              
                <div className="flex  w-full justify-center items-center flex-col ">
                      <div>
                        < Searchbar onSearch={onSearchHandler}/>  
                      </div>     
                      <div className="flex">
                              <Pagination 
                              page={page}
                              setPage={setPage}
                              totalPages ={totalPages}
                              />
                      </div>
                </div>
            </div>     
          {notFound? (
          <div className="flex flex-col items-center justify-center mt-4">
            We found no results for your search.
            <button className="border-0 p-1 px-6 mt-4 bg-sky-600 text-white font-bold rounded-xl" onClick={handleBackButton}>Back</button>
          </div>
        ) : ( 
        

          <div  className=" sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mt-4 m-auto ">   
              <div  className="grid sm:grid-cols-1 gap-4 md:grid-cols-2  xl:grid-cols-3 2xl:max-w-screen-2xl">
              {pokemons.map((pokemon, index) => (         
              <PokedexCard key={index}
              pokemon={pokemon}
              />     
                ))}
            </div>
          </div>
        
        )}
     
    </div>
  );
};

export default Pokedex;
