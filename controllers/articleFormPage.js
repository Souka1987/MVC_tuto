const path = require('path');



const Article = require('../database/models/article')
module.exports = (req, res) => {
    
    const query = req.params.id
    
    article.findByIdUpdate(query, {

        title: req.body.title,
        content: req.body.content,
        
    }, (err) => {
        console.log(article);
        if (err) console.log(err);
        res.render('article/edit', {
            article
        })
    })
}