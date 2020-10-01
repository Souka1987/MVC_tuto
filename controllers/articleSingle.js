const Article = require('../database/models/article')
//syncroniser l"url "/" avec la base de données avec la méthode "async"
module.exports = async (req, res)=>{
    const article = await Article.findById(req.params.id)
    res.render('article', {article})
}