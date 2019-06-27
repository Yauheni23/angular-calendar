const Guide = require('../db/db.config.js').guide;
const options = require('./options');
const isGuideCorrect = require('../validators/guide').isGuideCorrect;

exports.getAllGuides = (req, res) => {
    Guide.findAll(options).then((data) => {
        res.send(data);
    }).catch(err => {
        res.send({
            error: err.message
        })
    })
}

exports.getGuideById = (req, res) => {
    Guide.findOne({ ...options,
        where: {
            id: req.query.id || 1
        }}).then((data) => {
            res.send(data);
        }).catch(err => {
        res.send({
            error: err.message
        })
    })
}

exports.createGuide = (req, res) => {
    if(isGuideCorrect(req.body)) {
        Guide.create(req.body).then( result => {
            res.send({
                result
            })
        }).catch(err => {
            res.send({
                error: err.message
            })
        })
    } else {
        res.send({
            ok: false,
            message: 'Guide is not correct!'
        })
    }
}

exports.deleteGuide = (req, res) => {
    Guide.destroy({
        where: {
            id: req.query.id
        }
    }).then(result => {
        res.send({
            result
        })
    }).catch(err => {
        res.send({
            error: err.message
        })
    })
}
