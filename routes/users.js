const express = require('express');
const { users } = require('../data');
const router = express.Router();

router.get('/:id', async (req, res) => {
    if(!req.params || !req.params.id) {
        res.status(500).render('error/error.handlebars', {error: 'No user id passed in'});
        return;
    }

    // Make call from data.users to get user data with id
    var userData = undefined;
    try {
        userData = await users.getUser(req.params.id);
    } catch(e) {
        res.status(500).render('error/error.handlebars', {error: `${e}`});
        return;
    }

    res.render('users/userPage.handlebars', {userData: userData});
})

module.exports = router;