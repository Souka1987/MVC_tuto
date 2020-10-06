const path = require('path');
const Article = require('../database/models/article')

module.exports = async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('article/edit', { article })
}