const mongoCollections = require('../config/mongoCollections');
const videogames = mongoCollections.videogames;
let { ObjectId } = require('mongodb');

function ObjectIdToString(obj) {
    if(typeof obj !== 'object' || !ObjectId.isValid(obj._id))
        throw new Error('Object passed in needs to have a valid _id field');

    obj._id = obj._id.toString();

    return obj;
}

function validateId(id) {
    if(!id || typeof id !== 'string' || !stringCheck(id) || !ObjectId.isValid(id))
        throw new Error('id must be a valid ObjectId string');
}

function stringCheck(str) {
    return typeof str === 'string' && str.length > 0 && str.replace(/\s/g, "").length > 0;
}

async function create(gameId, title, reviewer, date, comment) {
    if(!gameId, !title || !reviewer || !date || !comment)
        throw new Error("Missing input");

    if(!stringCheck(gameId) || !stringCheck(title) || !stringCheck(reviewer) || !stringCheck(date) || !stringCheck(comment))
        throw new Error("All strings must contain non-whitespace characters");

    const gameCollection = await videogames();
    
    const commentObj = {
        _id: ObjectId(),
        title: title,
        reviewer: reviewer,
        date: date,
        comment: comment,
    };

    const game = await gameCollection.findOne({_id: ObjectId(gameId)});
    game.comments = game.comments.concat([commentObj]);
    const info = await gameCollection.updateOne({_id: game._id}, {$set: {comments: game.comments}});

    return ObjectIdToString(commentObj);
}

module.exports = {create}