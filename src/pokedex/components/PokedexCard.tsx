import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavoriteContext } from '../../favorites/contexts/FavoriteContext';
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail';
import Icon from './Icon';
import './style.css';



interface PokedexCardProps {
    pokemon: PokemonDetail;

}

export const PokedexCard: React.FC<PokedexCardProps> = ({pokemon}) => {
const {setFavorites, favorites} = useContext(FavoriteContext)
const navigate = useNavigate()     

const icon = "❤️"
const icon2 = "🖤"
function handleClick() {
    navigate(`/pokemon/${pokemon.name}`)
  }
   
  const addPokemonToFavorite = () => {
    setFavorites([...favorites, pokemon])
}
const removePokemonFromFavorite = () => {
    setFavorites(favorites.filter((poke)=>poke.name !== pokemon.name))
}

const isFavorite = favorites.some((poke)=> poke.name === pokemon.name)
    return (
        <div>
            <div>  
            <div  className="styleCssCard border-2 flex justify-between cursor-pointer shadow-lg transition duration-300 ease-in-out  hover:-translate-y-1 hover:scale-110">                     
               <div  onClick={handleClick} className=" p-4 flex items-center ">                          
                    <div>
                        <img className=" w-28" src={pokemon.sprites.front_default} alt="" />
                    </div>         
                    <div className='flex flex-col items-start capitalize'>
                       {pokemon.name}       
                        <div className=' mt-4 flex '>{pokemon.types.map((type,index)=><div key={index} className={' mr-2 border-2 px-6 rounded-md'}>{type.type.name }</div> )}</div>
                    </div>
                </div>
                    <div onClick={()=>isFavorite? removePokemonFromFavorite() : addPokemonToFavorite()}  className='flex items-center w-8 bg-white hover:bg-slate-200 rounded-2xl h-8 mt-16  mr-4 justify-center'>
                      <Icon icon={isFavorite ?  icon: icon2} />
                    </div>
            </div>
         </div>


       </div>
    );
};

export default PokedexCard;