import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { PokedexService } from '../../services/pokedexService'
import { checkPrismaError } from '../../utils'


export const GetAll: RequestHandler = async (req, res) => {
    const pokedexService = new PokedexService()

    try {
        var resp = await pokedexService.GetAllPokedex()
        res.status(StatusCodes.OK)
        res.send({ ...resp})
    } catch (err) {
        const response = checkPrismaError(err, {})
            res.status(response.status)
            res.send(response.message)
    }
}