import { RequestHandler } from 'express'
import { PokedexService } from '../../services/pokedexService'


export const AddPokemon: RequestHandler = async (req, res) => {
    const pokedexService = new PokedexService()
    const { pokedexId, pokemonName } = req.body
    var resp = await pokedexService.AddPokemon(pokedexId, pokemonName)
    res.status(resp.statusCode)
    res.send({pokemonId: resp.message})
}