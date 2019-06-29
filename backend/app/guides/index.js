const Guide = require('../db/db.config.js').guide;
const options = require('./options');
const isGuideCorrect = require('../validators/guide').isGuideCorrect;

const getAllGuides = (req, res) => {
    Guide.findAll(options).then((data) => {
        res.send(data);
    }).catch(err => {
        res.send({
            error: err.message,
        });
    });
};

const getGuideById = (req, res) => {
    Guide.findOne({
        ...options,
        where: {
            id: req.query.id || 1,
        },
    }).then((data) => {
        res.send(data);
    }).catch(err => {
        res.send({
            error: err.message,
        });
    });
};

const saveGuide = (req, res) => {
    if(isGuideCorrect(req.body)) {
        Guide.create(req.body).then(result => {
            res.send({
                result,
            });
        }).catch(err => {
            if(err.errors[0].type === 'unique violation') {
                updateGuide(req, res);
            } else {
                res.send({
                    error: err.message,
                });
            }
        });
    } else {
        res.send({
            ok: false,
            message: 'Guide is not correct!',
        });
    }
};

const updateGuide = (req, res) => {
    Guide.update(req.body, {
        where: {
            id: req.body.id,
        },
    }).then(resultUpdate => {
        res.send({
            result: resultUpdate,
        });
    });
};

const deleteGuide = (req, res) => {
    Guide.destroy({
        where: {
            id: req.query.id,
        },
    }).then(result => {
        res.send({
            result,
        });
    }).catch(err => {
        res.send({
            error: err.message,
        });
    });
};

module.exports = {
    getAllGuides,
    getGuideById,
    saveGuide,
    updateGuide,
    deleteGuide,
};
