import axios from 'axios'
import { PokemonDetail } from '../interfaces/PokemonDetail'




export const searchPokemon = async (pokemon: PokemonDetail) => {
    try{
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        console.log("error:", error);
    }
}
export const getPokemonsPage = async (limit = 50, offset = 0) => {
    try{
        let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        const response =  await axios.get(url)
        return response;       
    } catch{
        console.log("error");       
    }
}
export const getPokemonData = async (url: any) => {
    try{
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        console.log("error:", error);
    }
}