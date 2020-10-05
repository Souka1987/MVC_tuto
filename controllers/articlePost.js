const path = require('path');
const Article = require('../database/models/article')

module.exports =  (req, res) => {

    //Dire à express d'envoyer les images dans le fichier "articles"
    const { image } = req.files //Méthode destructuring, voir doc "affectation par décomposition"
    const uploadFile = path.resolve(__dirname, ".." ,"public/articles", image.name)
    /*"dirname" signifie, "je suis ici", il renvoie le chemin du dossier parent, 
    cela évite de prendre le dossier "public" à la racine, car risque de conflit avec le serveur.*/

    //permet de faire déplacer l'image dans l'url
    image.mv(uploadFile, (error) => {
        // pour faire apparaître l'image sur le site
        Article.create({

                ...req.body,
                image: `/articles/${image.name}`

            }

            , (error, post) => {
                res.redirect('/')
            })
    })

}


