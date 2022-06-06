import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PokemonDetail } from "./interfaces/PokemonDetail";
import { getPokemonDetails } from "./services/getPokemonDetails";
import "./style.css";
import BarProgress from "./BarProgress";
import { FavoriteContext } from "../favorites/contexts/FavoriteContext";
import Icon from "../pokedex/components/Icon";

interface PokemonDetailsProps { }

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const { favorites, setFavorites } = useContext(FavoriteContext);
  const [selectedPokemonDetails, setSelectedPokemonsDetails] = useState<
    PokemonDetail | undefined
  >(undefined);
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
  if (!selectedPokemonDetails) return;
  const isFavorite = favorites.some(
    (poke) => poke.name === selectedPokemonDetails.name
  );

  const data = selectedPokemonDetails;
  return (
    <div className="p-8 ">
     <div className="flex items-center justify-center flex-col">
      <h1 className=" styleCss text-center text-4xl uppercase">{name}</h1>
     </div>
      <div className=" sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl  m-auto ">
        <div className=" flex h-12  items-center md:max-w-2xl lg:max-w-4xl justify-between m-auto">
          <button
            className="border-0 p-1 px-6  bg-sky-600 text-white font-bold rounded-xl"
            onClick={handleBackButton}
          >
            Go Back
          </button>
          <div className="styleCss flex items-center justify-center ">
            {isFavorite
              ? `Remove to Favorite Pokémons`
              : "Add To Favorite Pokémons"}
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
        <div className="flex items-center justify-center">
          <img
            className=" sm:w-2/4"
            src={data?.sprites.other?.["official-artwork"].front_default}
            alt=""
          />
          <div>
            <div className="styleCss mt-2 text-2xl">Type</div>
            <div className=" styleCss flex">
              {" "}
              {data?.types.map((type) => (
                <div className=" styleCss text-2xl mr-2 text-white mt-4 mb-10 bg-gray-500 px-4 shadow-lg shadow-gray-500/50 capitalize">
                  {type.type.name}
                </div>
              ))}
            </div>
            <h1 className=" mb-10 text-4xl"> Nº{data?.id}</h1> 
            <div className=" styleCss text-2xl">Abilities</div>
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
        <div className=" sm:max-w-md m-auto md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl ">
          {data?.stats.map((stat) => (
            <div className="  justify-between max-w-4xl m-auto capitalize">
              <div className="styleCss  mt-2 mb-2">
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
