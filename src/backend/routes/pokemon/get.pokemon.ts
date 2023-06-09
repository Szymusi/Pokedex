import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { PokedexService } from '../../services/pokedexService'


export const getPokemon: RequestHandler = async (req, res) => {
    const pokedexService = new PokedexService()
    const { pokemonIdOrName } = req.body

    try {
        var resp = await pokedexService.GetPokemon(`${pokemonIdOrName}`)
        res.status(StatusCodes.OK)
        res.send({ ...resp[0]})
    } catch (err) {
        res.status(resp.status)
        res.send(resp.message)
    }
}