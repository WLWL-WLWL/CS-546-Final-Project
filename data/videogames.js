const users = mongoCollections.videogames;
let { ObjectId } = require('mongodb');

async function createVideoGame(name, score, releaseDate, developer, genre, price, boxart, comments) {
    const videogamesCollection = await videogames();
    let newVideogame = {
        name: name,
        score: score,
        releaseDate: releaseDate,
        developer: developer,
        genre: genre,
        price: price,
        boxart: boxart,
        comments: comments
    }
    const insertRes = await videogamesCollection.insertOne(newVideogame);
    if (insertRes.insertedCount === 0) throw 'Could not add restaurant';
    const newId = insertRes.insertedId;
    const vg = await this.getVideogameById(newId);
    return vg;
}


async function getAllVideoGames() {
    const videogamesCollection = await videogames();
    const videogamesList = await videogamesCollection.find({}).toArray();
    for (let i of videogamesList) {
        i._id = i._id.toString();
    }
    return videogamesList;
}

module.exports = { getAllVideoGames }