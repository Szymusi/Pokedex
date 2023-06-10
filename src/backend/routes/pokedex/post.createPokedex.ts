import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { PokedexService } from '../../services/pokedexService'
import { checkPrismaError } from '../../utils'


export const NewDeck: RequestHandler = async (req, res) => {
    const pokedexService = new PokedexService()
    const { email, name } = req.body
    
    var resp = await pokedexService.CreateNewDeck(email,name)
    res.status(resp.statusCode)
    res.send({pokedexId: resp.message})    
}