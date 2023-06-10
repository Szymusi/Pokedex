import axios from 'axios';
import { prisma } from '../../backend/database'
import { Pokedex } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';


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

    async GetPokemon(pokemonName: string) {
        try {
          var resp :any;
          await axios.get(
            `${pokemonApiUrl}/v1/pokemon/${pokemonName}`,
            { headers: {
                'User-Agent': user_agent
            } }
            ).then(res => resp = res.data)
      
          return { statusCode: StatusCodes.OK, message: resp[0]}
        } catch (error) {
          return { statusCode: StatusCodes.NOT_FOUND, message: `Pokemon ${pokemonName} not found`}
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
            return { statusCode: StatusCodes.CREATED, message: createdPokedex.id}
        }catch(err){
          return { statusCode: StatusCodes.BAD_REQUEST, message: `Pokedex not creadeted. Reason: ${err}`}
        }
    }

    async GetAllPokedex(){
        try {
            const pokedex = await prisma.pokedex.findMany( {
                include: { pokemons: true}
            } )
            return { statusCode: StatusCodes.OK, message: pokedex}
        }catch (error) {
          return { statusCode: StatusCodes.BAD_REQUEST, message: `Pokedexes unavaliable. Reason: ${error}`}
        }
    }

    async GetPokedex(pokedexId: number){
      try {
        const pokedex = await prisma.pokedex.findUniqueOrThrow({
            where: {
              id: pokedexId
            },
            include: { pokemons: true}
        } )
        return { statusCode: StatusCodes.OK, message: pokedex}
      }catch (error) {
        return { statusCode: StatusCodes.NOT_FOUND, message: `Pokedex id: ${pokedexId} not found`}
    }
    }

    async TransferPokemon(senderId: number, reciverId: number, pokemonId: number){
      const senderPokedex = await prisma.pokedex.findUnique({
        where:{
          id: senderId
        },
        include: {  pokemons:true }
      })

      const reciverPokedex = await prisma.pokedex.findUnique({
        where:{
          id: senderId
        },
        include: {  pokemons:true }
      })

      if(senderPokedex === null){
        return { statusCode: StatusCodes.NOT_FOUND, message: "Sender pokedex not found"}
      }
      
      if(reciverPokedex === null){
        return { statusCode: StatusCodes.NOT_FOUND, message: "Reciver pokedex not found"}
      }

      if(!senderPokedex.pokemons.find(x => x.id === pokemonId)){
        return { statusCode: StatusCodes.NOT_FOUND, message: "Pokemon not found"}
      }

      await prisma.pokedex.update({
        where: {
          id: senderId
        },
        data: {
          pokemons: {
            disconnect: [{ id: pokemonId}]
          }
        },
        include: {
          pokemons: true
        }
      })

      await prisma.pokedex.update({
        where: {
          id: reciverId
        },
        data: {
          pokemons: {
            connect: [{ id: pokemonId }]
          }
        },
        include: {
          pokemons: true
        }
      })

      return { statusCode: StatusCodes.OK, message: "Pokemon transfered"}
    }

    async AddPokemon(pokedexId: number, pokemonName: string){
      let pokemonInfo = await this.GetPokemon(pokemonName)
      let pokedex = await this.GetPokedex(pokedexId)

      if(pokedex.statusCode === StatusCodes.NOT_FOUND){ return pokedex}
      if(pokemonInfo.statusCode === StatusCodes.NOT_FOUND){ return pokemonInfo}

      let pokemonNumber: number =  pokemonInfo.message["number"]

      try {
        const newPokemon = await prisma.pokemon.create({
          data: {
            "name": pokemonName,
            "number": +pokemonNumber,
            "pokedexId": pokedexId
          },
        });
        return { statusCode: StatusCodes.OK, message: newPokemon.id}
      } catch (error) {
        return { statusCode: StatusCodes.BAD_REQUEST, message: `Failed to create pokemon. Reason: ${error}`}
      }
    }

    async EvolvePokemon(pokemonId: number){
      const pokemon = await prisma.pokemon.findUnique({
        where:{
          id: pokemonId
        }
      })

      if(pokemon === null) {  return { statusCode: StatusCodes.NOT_FOUND, message:`Pokemon id ${pokemonId} not found`}}

      const pokemonInfo = await this.GetPokemon(pokemon.name)
      let evolutionStage = pokemonInfo.message["family"].evolutionStage
      let evolutionLineLength  = pokemonInfo.message["family"].evolutionLine.length

      if(evolutionStage < evolutionLineLength){ 
        const pokemonName = pokemonInfo.message["family"].evolutionLine[evolutionStage]
        const evolvedPokemonInfo = (await this.GetPokemon(pokemonName)).message

        const updatedPokemon = await prisma.pokemon.update({
          where: {
            id: pokemonId
          },
          data: {
            name: pokemonName,
            number: +evolvedPokemonInfo.number
          }
        })

        return { statusCode: StatusCodes.OK, message: `Pokemon evolved into ${updatedPokemon.name}`}
      }
      return { statusCode: StatusCodes.BAD_REQUEST, message:"Pokemon already at max evolution lvl"}
    }

    async DeletePokemon(pokemonId: number){
      const pokemon = await prisma.pokemon.findUnique({
        where:{
          id: pokemonId
        }
      })

      if(pokemon === null) {  return { statusCode: StatusCodes.NOT_FOUND, message:`Pokemon id ${pokemonId} not found`}}

      await prisma.pokemon.delete({
        where:{
          id: pokemonId
        }
      })
      
      return { statusCode: StatusCodes.OK, message:`Pokemon Id ${pokemonId} deleted`}

    }

    async DeletePokedex(pokedexId: number){
      const pokedex = await prisma.pokedex.findUnique({
        where:{
          id: pokedexId
        }
      })

      if(pokedex === null) {  return { statusCode: StatusCodes.NOT_FOUND, message:`pokedex id ${pokedexId} not found`}}

      await prisma.pokemon.deleteMany({
        where:{
          pokedexId: pokedexId
        }
      })
      await prisma.pokedex.delete({
        where: {
          id: pokedexId
        }
      })
      
      return { statusCode: StatusCodes.OK, message:`Pokedex Id ${pokedexId} deleted`}

    }
}
    
      


