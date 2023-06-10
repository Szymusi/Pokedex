import { RequestHandler } from 'express'
import { PokedexService } from '../../services/pokedexService'


export const TransferPokemon: RequestHandler = async (req, res) => {
    const pokedexService = new PokedexService()
    const { senderId, reciverId, pokemonId } = req.body
    var resp = await pokedexService.TransferPokemon(senderId, reciverId, pokemonId)
    res.status(resp.statusCode)
    res.send(resp.message)
}