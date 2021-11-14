const logger = require('../../services/logger.service')
// const userService = require('../user/user.service')
const planetService = require('./planet.service')

async function getPlanets(req, res) {
    try {
        
        const isMinimized = Object.keys(req.query).length ? req.query : null
        console.log(isMinimized, 'isminimized');
        const planets = await planetService.query(isMinimized)
        res.send(planets)
    } catch (err) {
        logger.error('Cannot get planets', err)
        res.status(500).send({ err: 'Failed to get planets' })
    }
}

async function getOriginPlanets(req, res) {
    try {
        const planets = await planetService.getOriginPlanets()
        res.json(planets)
    } catch(err){
        logger.error('Failed to get original planets', err)
        res.status(500).send({err: 'Failed to get original planets'})
    }
}

async function getPlanet(req, res) {
    try {
        const planet = await planetService.getById(req.params.id)
        res.send(planet)
    } catch (err) {
        logger.error('Failed to get planet', err)
        res.status(500).send({ err: 'Failed to get planet' })
    }
}

async function deletePlanet(req, res) {
    try {
        await planetService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to delete planet' })
        logger.error('Failed to delete planet', err)

    }
}

async function addPlanet(req, res) {
    try {
        const planet = req.body
        const savedPlanet = await planetService.add(planet)
        res.send(savedPlanet)
    } catch (err) {
        logger.error('Failed to save planet', err)
        res.status(500).send({ err: 'Failed to save planet' })
    }
}

async function updatePlanet(req, res) {
    try {
        const planet = req.body
        const savedPlanet = await planetService.update(planet)
        res.send(savedPlanet)
    } catch (err) {
        logger.error('Failed to update planet', err)
        res.status(500).send({ err: 'Failed to update planet' })
    }
}

module.exports = {
    getPlanets,
    getPlanet,
    deletePlanet,
    addPlanet,
    updatePlanet,
    getOriginPlanets
}