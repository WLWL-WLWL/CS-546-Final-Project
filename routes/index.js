const constructor = (app) => {
    app.use('*', (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructor;