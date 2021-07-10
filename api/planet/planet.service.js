const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')



async function query(isMinimized) {
    try {
        const collection = await dbService.getCollection('planet')
        let planets = await collection.find().toArray();
        // if (isMinimized) {
        //     miniPlanets = planets.map(planet => {
        //         return {
        //             _id: planet._id,
        //             title: planet.title,
        //             styles: planet.styles,
        //             isStarred: planet.isStarred
        //         }
        //     });
        //     return miniPlanets;
        // }
        console.log(planets, 'planets from query')
        return planets
    } catch (err) {
        logger.error('cannot find planets', err)
        throw err
    }
}


async function remove(planetId) {
    try {
        const collection = await dbService.getCollection('planet')
        await collection.deleteOne({ '_id': ObjectId(planetId) })
    } catch (err) {
        logger.error(`cannot remove planet ${planetId}`, err)
        throw err
    }
}

async function getById(planetId) {
    try {
        const collection = await dbService.getCollection('planet')
        const planet = await collection.findOne({ '_id': ObjectId(planetId) })
        return planet
    } catch (err) {
        logger.error(`while finding toy ${planetId}`, err)
        throw err
    }
}

async function update(planet) {
    try {
        const planetToSave = planet;
        planetToSave._id = ObjectId(planetToSave._id);
        const collection = await dbService.getCollection('planet')
        await collection.updateOne({ '_id': planetToSave._id }, { $set: planetToSave })
        return planetToSave;
    } catch (err) {
        logger.error(`cannot update planet ${planet._id}`, err)
        throw err
    }
}

async function add(planet) {
    try {
        const planetToAdd = planet;
        const collection = await dbService.getCollection('planet')
        await collection.insertOne(planetToAdd)
        return planetToAdd;
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

module.exports = {
    query,
    remove,
    add,
    getById,
    update
}


