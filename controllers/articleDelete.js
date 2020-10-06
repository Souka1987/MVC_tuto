//POUR SUPPRIMER UN ARTICLE

const path = require('path');
const Article = require('../database/models/article')

module.exports = async (req, res) => {

    console.log(req.body);
    Article.deleteOne({
            _id: req.params.id
        },
        function (err) {
            if (err) console.log(err);
            res.redirect('/index')

        })
    }

