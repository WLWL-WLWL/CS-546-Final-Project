const ratingRoutes = require('./rating');
const users = require('./users');
const videogames = require('./videogames');
const constructor = (app) => {
    app.use('/rating', ratingRoutes);
    app.use('/users', users);
    app.use('/videogames', videogames);
    app.use('*', (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructor;