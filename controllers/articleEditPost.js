//POUR MODIFIER UN ARTICLE, ici avec la méthode POST.

const path = require('path');
const Article = require('../database/models/article')

//syncroniser l"url "/" avec la base de données avec la méthode "async"
module.exports = async (req, res)=>{

    const q = req.params.id
    // récuperé les req.files
    

    // une condition (si name: image)
      // on fabrique l'objet de notre image 
      // on supprime l'ancienne image
      // on édit le nouveau contenu
      // on renvoie le resultat


    // Si pas d'image alors tu fais ça

    // 

    console.log(req.body)//Voir si cela fonctionne
    Article.findByIdAndUpdate(q ,{//Définir les variables de son article
        
        title: req.body.title,
        content: req.body.content,
        author: req.body.author 
        // Rajouter le nom de l'image

    }, (err) => {
        if (err) console.log(err);//Si il y a une erreur, l'afficher
        res.redirect('/articles/edit/' + q)//sinon renvoyer sur la page d'édition
    })
}

