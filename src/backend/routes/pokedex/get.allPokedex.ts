import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { PokedexService } from '../../services/pokedexService'
import { checkPrismaError } from '../../utils'


export const GetAll: RequestHandler = async (req, res) => {
    const pokedexService = new PokedexService()
    var resp = await pokedexService.GetAllPokedex()
    res.status(resp.statusCode)
    res.send({ pokedex: resp.message})
}