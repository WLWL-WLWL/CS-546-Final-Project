const express = require('express');
const { videogames } = require('../data');
const router = express.Router();

router.get('/:id', async (req, res) => {
    if(!req.params || !req.params.id) {
        res.status(500).render('/error/error', {error: 'No video game id passed in'});
        return;
    }

    // Make call from videogames.users to get user data with id
    const videogameData = await videogames.getGame(req.params.id);

    res.render('videogames/videogamesPage.handlebars', {videogameData: videogameData});
})

module.exports = router;