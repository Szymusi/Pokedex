import express from 'express'
import { GetPokemon } from './pokemon/get.pokemon'
import { NewDeck } from './pokedex/post.createPokedex'
import { GetAll } from './pokedex/get.allPokedex'
import { GetPokedex } from './pokedex/get.pokedex'
import { TransferPokemon } from './pokedex/post.transferPokemon'
import { AddPokemon } from './pokemon/post.addPokemon'
import { EvolvePokemon } from './pokemon/post.evolvePokemon'
import { DeletePokemon } from './pokemon/delete.pokemon'
import { DeletePokedex } from './pokedex/delete.pokedex'


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

//post
router.post('/api/pokedex/create', NewDeck)
router.post('/api/pokedex/tranferpokemon', TransferPokemon)
router.post('/api/pokemon/addpokemon', AddPokemon)
router.post('/api/pokemon/evolve', EvolvePokemon)

//get
router.get('/api/pokedex/get', GetPokedex)
router.get('/api/pokedex/getall', GetAll)
router.get('/api/pokemon/get', GetPokemon)

//delete
router.delete('/api/pokemon/delete', DeletePokemon)
router.delete('/api/pokedex/delete', DeletePokedex)


export default router