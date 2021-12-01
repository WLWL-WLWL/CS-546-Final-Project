const express = require('express');
const { users } = require('../data');
const { videogames } = require('../data');
const router = express.Router();

router.get('/:id', async (req, res) => {
    if(!req.params || !req.params.id) {
        res.status(500).render('error/error.handlebars', {error: 'No user id passed in'});
        return;
    }

    // Make call from data.users to get user data with id
    var userData = undefined;
    var gameList = [];
    var genreStats = {};
    try {
        userData = await users.getUser(req.params.id);
        for(var gameId of userData.voteHistory) {
            const game = await videogames.getGame(gameId);
            gameList.push(game.name);
            game.genre in genreStats ? genreStats[game.genre]++ : genreStats[game.genre] = 1;
        }
    } catch(e) {
        res.status(500).render('error/error.handlebars', {error: `${e}`});
        return;
    }

    Object.keys(genreStats).forEach(g => genreStats[g] = (genreStats[g] / userData.numberOfVotes) * 100);

    res.render('users/userPage.handlebars', {userData: userData, gameList: gameList, genreStats: genreStats});
})

module.exports = router;