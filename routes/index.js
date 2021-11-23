const ratingRoutes = require('./rating');

const constructor = (app) => {
    app.use('/rating', ratingRoutes);
    app.use('*', (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructor;