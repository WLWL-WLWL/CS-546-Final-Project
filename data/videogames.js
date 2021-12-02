const users = mongoCollections.videogames;
let { ObjectId } = require('mongodb');




async function getAllVideoGames() {
    const videogamesCollection = await videogames();
    const videogamesList = await videogamesCollection.find({}).toArray();
    for (let i of videogamesList) {
        i._id = i._id.toString();
    }
    return videogamesList;
}

module.exports = { getAllVideoGames }