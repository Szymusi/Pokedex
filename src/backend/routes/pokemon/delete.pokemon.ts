import { RequestHandler } from 'express'
import { PokedexService } from '../../services/pokedexService'


export const DeletePokemon: RequestHandler = async (req, res) => {
    const pokedexService = new PokedexService()
    const { pokemonId } = req.body
    var resp = await pokedexService.DeletePokemon(pokemonId)
    res.status(resp.statusCode)
    res.send({ info: resp.message})
}