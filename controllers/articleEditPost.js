//POUR MODIFIER UN ARTICLE, ici avec la méthode POST.
const Article = require('../database/models/article');
const path = require('path');
const fs = require('fs');



//syncroniser l"url "/" avec la base de données avec la méthode "async"
module.exports = async (req, res) => {
    const q = req.params.id

    // Récupération l'article grace au params.id
    const articleID = await Article.findById(q)

    // une condition (si name: image)
    // on fabrique l'objet de notre image
    if (req.files) {
        const { image } = req.files
        const uploadFile = path.resolve("./public/articles", image.name)

        // Traitement de l'image (mv) qui parametre le chemin ou enregisterer notre fichier (image)
        image.mv(uploadFile, (err) => {
            if (err) console.log(err)

            // On appel le Model (Article) on lui pass la fonction findByIdAndUpdate (on viens selectionner notre objet grace à sont id
            // Suppression dans la base de donné
            Article.findByIdAndUpdate(q, {
                // On définit les nouvelle valeur de notre objet
                title: req.body.title,
                content: req.body.content,
                author: req.body.author,
                image: `/articles/${image.name}`

                // Le callback d'err ou pour réaliser une autre action
            }, (err, article) => {
                if (err) console.log(err); //Si il y a une erreur, l'afficher

                // Ici nous appelons fs pour allez supprimer notre ancienne image
                // Suppression de l'image dans notre arboresence
                fs.unlink('./public/' + article.image, (err) => {
                    if (err) console.log(err)
                    res.redirect('/articles/edit/' + q) //sinon renvoyer sur la page d'édition

                })
            })
        })



    } else {
        //Sinon pas d'image alors tu fais ça
        console.log('Pas de files')
        Article.findByIdAndUpdate(q, { //Définir les variables de son article

            title: req.body.title,
            content: req.body.content,
            author: req.body.author

        }, (err) => {
            if (err) console.log(err); //Si il y a une erreur, l'afficher
            res.redirect('/articles/edit/' + q) //sinon renvoyer sur la page d'édition
        })
    }
}