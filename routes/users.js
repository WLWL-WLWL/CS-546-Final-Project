const express = require('express');
const { users } = require('../data');
const router = express.Router();

router.get('/:id', async (req, res) => {
    if(!req.params || !req.params.id) {
        res.status(500).render('/error/error', {error: 'No user id passed in'});
        return;
    }

    // Make call from data.users to get user data with id
    // const userData = await users.getUser(req.params.id);

    res.render('users/userPage.handlebars', {userData: undefined});
})

module.exports = router;