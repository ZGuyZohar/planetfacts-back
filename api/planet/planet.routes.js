const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const { log } = require('../../middlewares/logger.middleware')
const { getPlanets, getPlanet, deletePlanet, addPlanet, updatePlanet } = require('./planet.controller')
// const { addBoard, getBoards, getBoard, updateBoard, deleteBoard } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getPlanets)
router.get('/:id', getPlanet)

// router.put('/:id', updateBoard)
// router.put('/:id', requireAuth, updateBoard)

// router.post('/', addBoard)
// router.post('/', requireAuth, addBoard)

// router.delete('/:id', deleteBoard)
// router.delete('/:id', requireAuth, requireAdmin, deleteBoard)

module.exports = router


