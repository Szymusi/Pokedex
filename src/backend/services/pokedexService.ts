import axios from 'axios';
import { prisma } from '../../backend/database'
import { Pokedex } from '@prisma/client';


var pokemonApiUrl : string;
var user_agent : string;

export type PokemonResponse = {
    name: string;
    job: string;
    id: string;
    createdAt: string;
  };

export class PokedexService {
    constructor() {
        pokemonApiUrl = process.env.BASEPOKEMON_URL as string;
        user_agent = process.env.USER_AGENT as string;
    }



    async GetPokemon(path: string) {
        try {
          var resp :any;
          await axios.get(
            `${pokemonApiUrl}/v1/pokemon/${path}`,
            { headers: {
                'User-Agent': user_agent
            } }
            ).then(res => resp = res.data);
      
          return resp;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            return error.message;
          } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
          }
        }
      }

    async CreateNewDeck(email: string, name: string){
        try {
            const createdPokedex = await prisma.pokedex.create({
                data: {              
                name,
                email
                },
            })  
            return createdPokedex.id;
        } catch(err){
        throw err;
        }
    }

    async GetAllPokedex(): Promise<Pokedex[]>{
        try {
            const pokedex = await prisma.pokedex.findMany( {
                include: { pokemons: true}
            } )
            return pokedex
        } catch (error) {
            throw error
        }
    }

    async GetPokedex(pokedexId: number){
        try {
            const pokedex = await prisma.pokedex.findUnique({
                where: {
                  id: pokedexId,
                  
                },
                include: { pokemons: true}
            })
            if(pokedex){}
            return pokedex
        } catch (error) {
            throw error
        }
    }
}
    
      


