import { RequestHandler } from 'express'
import { PokedexService } from '../../services/pokedexService'


export const GetPokedex: RequestHandler = async (req, res) => {
    const pokedexService = new PokedexService()
    const { pokedexId } = req.body
    var resp = await pokedexService.GetPokedex(pokedexId)
    res.status(resp.statusCode)
    res.send({ pokedex: resp.message})
}