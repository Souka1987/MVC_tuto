const path = require('path');
const article = require('../database/models/article');


module.exports =  (req, res) => {
    article.findById({
        _id: req.params.id
    }, {
        //update
        title: req.body.title,
        content: req.body.content,
        author:req.body.author,
        image: req.body.image
    })
    res.send('modifié');
}

