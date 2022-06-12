import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PokemonDetail } from "./interfaces/PokemonDetail";
import { getPokemonDetails } from "./services/getPokemonDetails";
import "./styleFont.css";
import BarProgress from "./BarProgress";
import { FavoriteContext } from "../favorites/contexts/FavoriteContext";
import Icon from "../pokedex/components/Icon";


interface PokemonDetailsProps {}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  
  const { favorites, setFavorites } = useContext(FavoriteContext);
  const [selectedPokemonDetails, setSelectedPokemonsDetails] = useState<PokemonDetail | undefined>(undefined);
  const { name } = useParams();
  const icon = "❤️";
  const icon2 = "🖤";
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!name) return;
    getPokemonDetails(name).then((response) =>
      setSelectedPokemonsDetails(response)
    );
  }, [name]);

  const handleBackButton = () => {
    navigate(-1);
  };
  const addPokemonToFavorite = () => {
    if (!selectedPokemonDetails) return;
    setFavorites([...favorites, selectedPokemonDetails]);
  };
  const removePokemonFromFavorite = () => {
    if (!selectedPokemonDetails) return;
    setFavorites(
      favorites.filter((poke) => poke.name !== selectedPokemonDetails.name)
    );
  };

  
  const isFavorite = favorites.some((poke) => poke.name === selectedPokemonDetails?.name);

  const data = selectedPokemonDetails;
  return (
    <div className="p-2">
     <div>
      <h1 className=" styleCss text-center text-4xl uppercase">{name}</h1>
     </div>
      <div >
        <div className=" flex h-12  items-center md:max-w-2xl lg:max-w-4xl justify-between m-auto">
          <button
            className="border-0 p-1 px-6  bg-sky-600 text-white font-bold rounded-xl xs:mr-4 xs:mt-4 sm:mr-0 sm:mt-0"
            onClick={handleBackButton}
          >
             Back
          </button>
          <div className="styleCss flex items-center justify-center xs:mt-4 sm:mt-0">
            {isFavorite
              ? `Remove from favorite Pokémons`
              : "Add to favorite Pokémons"}
            <div
              onClick={() =>
                isFavorite
                  ? removePokemonFromFavorite()
                  : addPokemonToFavorite()
              }
              className=" flex cursor-pointer ml-4 items-center w-8 bg-white hover:bg-slate-200 rounded-2xl h-8   mr-4 justify-center"
            >
              <Icon icon={isFavorite ? icon : icon2} />
            </div>
          </div>
        </div>
        <div className="flex items-center  justify-around max-w-4xl m-auto xs:flex-col sm:flex-row">
          <img
            className="  xs:w-5/6 xs:mt-4 sm:w-6/12"
            src={data?.sprites.other?.["official-artwork"].front_default}
            alt=""
          />
          <div>
            <div className="styleCss mt-2 text-2xl mr-2">Type</div>
            <div className=" styleCss flex ">
              {" "}
              {data?.types.map((type) => (
                <div className=" styleCss text-2xl mr-8 text-white mt-4 mb-10 bg-gray-500 px-4 shadow-lg shadow-gray-500/50 capitalize ">
                  {type.type.name}
                </div>
              ))}
            </div>
            <h1 className=" mb-10 text-4xl mr-2"> Nº{data?.id}</h1> 
            <div className=" styleCss text-2xl mr-8">Abilities</div>
            <div className=" styleCss flex-wrap flex">
              {data?.abilities.map((abilities) => (
                <div className="mr-2 text-2xl mt-4 mb-4 text-white bg-violet-500 px-4 shadow-lg shadow-violet-500/50  capitalize">
                  {" "}
                  {abilities.ability.name}{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          {data?.stats.map((stat) => (
            <div className="  justify-between max-w-4xl m-auto capitalize ">
              <div className="styleCss   mb-2">
                <BarProgress
                  statsName={stat.stat.name}
                  statsBase={stat.base_stat}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
