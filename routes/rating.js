const express = require('express');
const router = express.Router();
const data = require('../data');
const ratings = data.ratings;
const games = data.videogames;

function type_checker(item, type, errString, objType){
    if(item == undefined || typeof(item) != type || item.length == 0) throw errString;
    if(type == "string"){
        if (!/\S/.test(item)) throw errString;
    }
    if(objType == "array"){
        if(!Array.isArray(item) || item.length == 0) throw errString;
    }
}

router.get('/', async (req, res) => {
    try{
        
    } catch(e){
        console.log(e);
        return;
    }
});

router.post('/reset', async (req, res) => {
    try{
        let gameData = undefined;
        if(req.data.side == 'left'){
            gameData = await games.getGame(req.session.leftGame);
        } else {
            gameData = await games.getGame(req.session.rightGame);
        }
        

module.exports = router;