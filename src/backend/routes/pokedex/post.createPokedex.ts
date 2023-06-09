import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { PokedexService } from '../../services/pokedexService'
import { checkPrismaError } from '../../utils'


export const NewDeck: RequestHandler = async (req, res) => {
    const pokedexService = new PokedexService()
    const { email, name } = req.body

    try {
        var resp = await pokedexService.CreateNewDeck(email,name)
        res.status(StatusCodes.CREATED)
        res.send({pokedexId: resp})
    } catch (err) {
        const response = checkPrismaError(err, {
        uniqueConstraintFailed: 'Email must be unique.',
        })
        res.status(response.status)
        res.send(response.message)
    }
}