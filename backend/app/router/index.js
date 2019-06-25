const guides = require('../guides');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    app.route('/guide')
        .get(guides.getGuideById)
        .post(guides.createGuide)
        .delete(guides.deleteGuide);

    app.get('/guides', guides.getAllGuides);
};
