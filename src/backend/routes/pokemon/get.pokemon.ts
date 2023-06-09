import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { PokedexService } from '../../services/pokedexService'


export const GetPokemon: RequestHandler = async (req, res) => {
    const pokedexService = new PokedexService()
    const { pokemonName } = req.body

    var resp = await pokedexService.GetPokemon(pokemonName)
    res.status(resp.statusCode)
    res.send(resp.message)
}