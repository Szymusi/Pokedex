import { RequestHandler } from 'express'
import { PokedexService } from '../../services/pokedexService'


export const EvolvePokemon: RequestHandler = async (req, res) => {
    const pokedexService = new PokedexService()
    const { pokemonId } = req.body
    var resp = await pokedexService.EvolvePokemon(pokemonId)
    res.status(resp.statusCode)
    res.send({ pokemon: resp.message})
}