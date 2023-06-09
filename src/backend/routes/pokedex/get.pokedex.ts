import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { PokedexService } from '../../services/pokedexService'
import { checkPrismaError } from '../../utils'


export const GetDeck: RequestHandler = async (req, res) => {
    const pokedexService = new PokedexService()
    const { pokedexId } = req.body

    try {
        var resp = await pokedexService.GetPokedex(pokedexId)
        resp === null ? res.status(StatusCodes.NOT_FOUND) : res.status(StatusCodes.OK)
        res.send({ pokedex: resp})
    } catch (err) {
        const response = checkPrismaError(err, {})
            res.status(response.status)
            res.send(response.message)
    }
}