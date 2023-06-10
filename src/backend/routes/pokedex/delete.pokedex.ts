import { RequestHandler } from 'express'
import { PokedexService } from '../../services/pokedexService'


export const DeletePokedex: RequestHandler = async (req, res) => {
    const pokedexService = new PokedexService()
    const { pokedexId } = req.body
    var resp = await pokedexService.DeletePokedex(pokedexId)
    res.status(resp.statusCode)
    res.send({ info: resp.message})
}