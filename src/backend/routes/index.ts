import express from 'express'
import { getPokemon } from './pokemon/get.pokemon'
import { NewDeck } from './pokedex/post.createPokedex'
import { GetAll } from './pokedex/get.allPokedex'
import { GetDeck } from './pokedex/get.pokedex'


const router = express.Router()
// middleware
router.use((req, res, next) => {
    console.log('Time: ', Date.now())   
    next()
})
// home page route
router.get('/', (req, res) => {
    res.send('Example home page')
})
// api route
router.post('/api/pokedex/create', NewDeck)
// router.post('/api/pokedex/update', UpdateDeck)
router.get('/api/pokedex/get', GetDeck)
router.get('/api/pokedex/getall', GetAll)
router.get('/api/pokemon', getPokemon)

export default router