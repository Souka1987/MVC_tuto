//Définir les constantes
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const article = require('./database/models/article');
const bodyParser = require('body-parser')

//Mongoose pour le lien avec nodejs. "blog" sera le nom de la base de données.
mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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
app.use(express.static('public'));

//Route
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//syncroniser l"url "/" avec la base de données avec la méthode "async"
app.get("/", async (req, res) => {

    //ci-dessous, syntax permetant d'attendre le retour de la requête + "Post.find({})" pour afficher le contenu de la database.
    const posts = await Post.find({})
    res.render("index", {
        posts
    })
})

app.get("/contact", (req, res) => {
    res.render('contact')
})


//Articles
//Définir l'url
app.get("/articles/add", (req, res) => {
    res.render("articles/add")
})


//bodyParser, il est utilisé pour parser une page, il peut aussi afficher un modal.
//aussi, le mentionner dans le html "add.hbs" voir ligne 5.
app.post("/articles/post", (req, res) => {
    //Lorsque l'on va demander la requête "post", elle sera ajouté dans la database grace au "bodyParser".
    Post.create(req.body, (error, post) => {

        res.redirect('/')
    })
    console.log(req.body);

})

//Port
app.listen(3000, function () {
    console.log("Le serveur tourne sur le port 3000");
})