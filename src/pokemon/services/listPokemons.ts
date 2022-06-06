import axios from "axios"
import { useState } from "react";
import { PokemonDetail } from "../interfaces/PokemonDetail";
import { getPokemonDetails } from "./getPokemonDetails";

export interface PokemonListInterface {
    name: string;
    url: string;
}
 export interface ListPokemonsInterface {
    count: number;
    next: null | string;
    previus: null | string;
    results: PokemonDetail[];
}

export interface ListPokemonsPrevius {
    count: number;
    next: null | string;
    previus: string;
    results: PokemonListInterface[];
}


export async function listPokemon(): Promise<ListPokemonsInterface> {
   
   
    const endpoint = `https://pokeapi.co/api/v2/pokemon`;

    const response =  await axios.get<ListPokemonsInterface>(endpoint)
    
    
    const promiseArray = response.data.results.map(({name}) => getPokemonDetails(name)) 
    const resultsPromise = await Promise.all(promiseArray)

    return {
        ...response.data,
        results: resultsPromise,
    };      
 }