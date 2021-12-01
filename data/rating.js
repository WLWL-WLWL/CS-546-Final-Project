const mongoCollections = require('../config/mongoCollections');
const bcrypt = require("bcrypt");
const salt = 10;
const videogames = mongoCollections.videogames;
let { ObjectId } = require('mongodb');

function ObjectIdToString(obj) {
    if(typeof obj !== 'object' || !ObjectId.isValid(obj._id))
        throw new Error('Object passed in needs to have a valid _id field');

    obj._id = obj._id.toString();

    return obj;
}

async function getRandomGame() {
    const videogamesCollection = await videogames();
    const allGames = await videogamesCollection.find({}).toArray();
    const randomGame = allGames[Math.floor(Math.random() * allGames.length)];
    return randomGame;
}

async function addRating(id, rating){
    validateId(id);
    const objId = ObjectId(id);

    let game = await gameCollection.findOne({_id: objId});
    if(game == null)
        throw new Error(`No item was found in User collection that match with id: ${id}`);
    
    let newRating = (game.totalVotes * game.averageUserRating + rating) / (game.totalVotes + 1);

    await gameCollection.updateOne({_id: objId}, {$set: {averageUserRating: newRating, totalVotes: game.totalVotes+1}});
    game = await gameCollection.findOne({_id: objId});

    return ObjectIdToString(game);
}

async function addRatingToUser(username){
    const userCollection = await users();
    let user = await userCollection.findOne({username: username});
    if(user == null)
        throw new Error(`No item was found in User collection that match with username: ${username}`);

    await userCollection.updateOne({username: username}, {$set: {numberOfVotes: user.numberOfVotes+1}});
    user = await userCollection.findOne({username: username});

    return ObjectIdToString(user);    
}

module.exports = {
    getRandomGame,
    addRating,
    addRatingToUser
}