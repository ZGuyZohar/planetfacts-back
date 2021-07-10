const logger = require('../../services/logger.service')
// const userService = require('../user/user.service')
const planetService = require('./planet.service')

async function getPlanets(req, res) {
    try {
        const isMinimized = req.query;
        const planets = await planetService.query(isMinimized)
        res.send(planets)
    } catch (err) {
        logger.error('Cannot get planets', err)
        res.status(500).send({ err: 'Failed to get planets' })
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
        if (
            (req.params.id === '6062231855c6426f8c7ab2e1' ||
                req.params.id === '60632833f0c8d3001556781b' ||
                req.params.id === '606212907ad16945f0800c7f')
            && !req.session.user.isAdmin) {
            throw new Error('not eligable');
        }
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
    updatePlanet

}