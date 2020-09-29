//Post
const Post = require('../database/models/article')

//En lien avec la ligne 70 de "app.js"
module.exports = async (req, res) => {

    //ci-dessous, syntax permetant d'attendre le retour de la requête + "Post.find({})" pour afficher le contenu de la database.
    const posts = await Post.find({})

    //indiquer les valeurs de la session
    console.log(req.session);

    res.render("index", {
        posts
    })
}