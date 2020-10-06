//POUR MODIFIER UN ARTICLE, ici avec la méthode POST.

const path = require('path');
const Article = require('../database/models/article')

//syncroniser l"url "/" avec la base de données avec la méthode "async"
module.exports = async (req, res)=>{

    const q = req.params.id

    console.log(req.body)//Voir si cela fonctionne
    Article.findByIdAndUpdate(q ,{//Définir les variables de son article
        
        title: req.body.title,
        content: req.body.content,
        author: req.body.author 

    }, (err) => {
        if (err) console.log(err);//Si il y a une erreur, l'afficher
        res.redirect('/articles/edit/' + q)//sinon renvoyer sur la page d'édition
    })
}

