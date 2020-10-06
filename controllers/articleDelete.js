//POUR SUPPRIMER UN ARTICLE AVEC SON IMAGE
const Article = require('../database/models/article')
const fs = require('fs')
const path = require('path')

module.exports = async (req, res) => {
    const article = await Article.findById(req.params.id)
    console.log('Controller Delete One Article')//Toujours voir si cela fonction avec le console.log
    console.log(article)

    fs.unlink('./public/' + article.image, (err) => {/*la méthode "fs.unlink" sert à effacer un fichier
    depuis le dossier ciblé*/

    /*après avoir défini la suppression procéder à la suppression de l'article entier en ne 
    ciblant que son id*/

        if (err) return console.log(err)
        Article.deleteOne({
                _id: req.params.id//tjs définir l'ID
            }, (err) => {
                if (!err) return res.redirect('/')
                else res.send(err)
            })
    })

}