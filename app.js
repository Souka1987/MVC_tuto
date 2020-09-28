//Définir les constantes
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const article = require('./database/models/article');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const path = require('path')


//ENV
require('dotenv').config()
//console.log(process.env);
//require('./console')

//Mongoose pour le lien avec nodejs. "blog" sera le nom de la base de données.
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Handlebars.moment => Pour formater la temporalité (dates/horraires)
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

//Post
const Post = require('./database/models/article')

//Pour faire fonctionner "express"
const app = express();


//bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
//Pour les images
app.use(fileupload())

//Pour les images
app.use(express.static('public'));

//Route
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//Middleware
const middleware = (req, res, next) => {
    if(!req.files){
        return res.redirect('/')
    }
console.log('je suis le middleware');
next()
}
//éxécuter avec express
app.use("/articles/post", middleware)



//syncroniser l"url "/" avec la base de données avec la méthode "async"
app.get("/", async (req, res) => {

    //ci-dessous, syntax permetant d'attendre le retour de la requête + "Post.find({})" pour afficher le contenu de la database.
    const posts = await Post.find({})
    res.render("index", {posts} )
})

//Articles
//Définir l'url
app.get("/articles/add", (req, res) => {
    res.render("articles/add")
})

app.get ("/articles/:_id", async (req, res)=>{
    const article = await Post.findById(req.params.id)
    res.render('articles', {article})
})

//bodyParser, il est utilisé pour parser une page, il peut aussi afficher un modal.
//aussi, le mentionner dans le html "add.hbs" voir ligne 5.
app.post("/articles/post", (req, res) => {

    //Dire à express d'envoyer les images dans le fichier "articles"
    const { image } = req.files //Méthode destructuring, voir doc "affectation par décomposition"
    const uploadFile = path.resolve(__dirname, "public/articles", image.name)
    /*"dirname" signifie, "je suis ici", il renvoie le chemin du dossier parent, 
    cela évite de prendre le dossier "public" à la racine, car risque de conflit avec le serveur.*/

    //permet de faire déplacer l'image dans l'url
    image.mv(uploadFile, (error) => {
        // pour faire apparaître l'image sur le site
        Post.create({

                ...req.body,
                image: `/articles/${image.name}`

            }

            , (error, post) => {
                res.redirect('/')
            })
    })

})
//console.log(req.files); //Pour donner les infos de l'image.

//Définir la page "contact"
app.get("/contact", (req, res) => {
    res.render('contact')
})


//Port
app.listen(3000, function () {
    console.log("Le serveur tourne sur le port 3000");
})