// ! Javascript lit de haut en bas et de droite à gauche

/** CONSTANTES **/

const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
// le flash est une zone spéciale de la session servant à stocker les infos utilisateur.
const connectFlash = require('connect-flash');
// éditeur de texte
const {
    stripTags, limit
} = require('./helpers/hbs');

//Indispensable pour les méthodes "put" et "delete"
const methodOverride = require('method-override');


/** CONTROLLERS **/

//ARTICLES
const articleSingleController = require('./controllers/articleSingle')
const articleAddController = require('./controllers/articleAdd')
const articlePostController = require('./controllers/articlePost')
const homePage = require('./controllers/homePage')

//PUT - pour éditer un article par l'utilisateur ou l'admin
const articleEditPostController = require('./controllers/articleEditPost')
const articleEditPageController = require('./controllers/articleEditPage')

//DELETE
const articleDeleteController = require('./controllers/articleDelete')

//USERS
const userCreate = require('./controllers/userCreate')
const userRegister = require('./controllers/userRegister')
const userLogin = require('./controllers/userLogin')
const userLoginAuth = require('./controllers/userLoginAuth')
const userLogout = require('./controllers/userLogout')

//ENV
require('dotenv').config()
//console.log(process.env);


//Mongoose pour le lien avec nodejs. "blog" sera le nom de la base de données.
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)

//Handlebars.moment => Pour formater la temporalité (dates/horraires)
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

//Pour faire fonctionner "express"
const app = express();

//MongoStore
const mongoStore = MongoStore(expressSession) //connection du module "MongoStore" dans "expressSession"

//Connect-Flash
app.use(connectFlash())

//methode-override => pour la mise à jour.
app.use(methodOverride("_method"))

//Users
app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true, //sauvegarde ce qui n'est pas initialisé
    resave: false, //enregistre automatiquement la session même si elle n'est pas modifiée

    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

//bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
//Pour les images
app.use(fileupload())

//Authentification, on passe par le middleware
const auth = require("./middleware/auth");
/*Le flash est généralement utilisé en combinaison avec des redirections, 
garantissant que le message est disponible sur la page suivante.*/
const redirectAuthSucess = require('./middleware/redirectAuthSucess')

//Pour les images
app.use(express.static('public'));

//ROUTE
app.engine('handlebars', exphbs({
    helpers: {
        stripTags: stripTags,
        limit: limit //"limit", pour la réduction des cards
        /*pour l'édition de texte afin de le faire passer dans le
                moteur de templating "app.engine"*/
    },
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use('*', (req, res, next) => { 
    res.locals.user = req.session.userId;//pour voir le numéro d'identification de l'user
    console.log(res.locals.user);
    next()
})


//MIDDLEWARE
// Pour la validation de l'article
const articleValidPost = require('./middleware/articleValidPost');
// Définir le model de l'article que l'on va chercher dans la database
const Article = require('./database/models/article');
app.use("/articles/post", articleValidPost);
// Ajouter un article suite à l'authentification
app.use("/article/add", auth);


app.get("/", homePage)


//ARTICLES, définir l'url
// Page Create Article
app.get("/article/add", articleAddController)
// Formulaire create Article
app.post("/articles/post", articlePostController)
// Formulaire Article
app.get("/articles/:id", articleSingleController)
// Formulaire de la page d'édition
app.get("/articles/edit/:id", articleEditPageController)
// Formulaire d'édition
app.post("/articles/edit/:id", articleEditPostController)
// Boutton de suppression
app.get("/articles/delete/:id", articleDeleteController)


//USERS
// Pour la création d'articles
app.get("/user/create", redirectAuthSucess, userCreate)
// Pour s'enregister
app.post("/user/register", redirectAuthSucess, userRegister)
// Pour se connecter
app.get("/user/login", redirectAuthSucess, userLogin)
// Pour l'authentification
app.post('/user/loginAuth', redirectAuthSucess, userLoginAuth)
// Pour se déconnecter
app.get("/user/logout", userLogout) //se déconnecter sans redirection


//Définir la page "contact"
app.get("/contact", (req, res) => {
    res.render('contact')
})

//ERROR 404
app.use((req, res) => {
    /*On demande à javascript de renvoyer l'user vers la
page "error404", lorsqu'il rentre un url qui n'existe pas dans l'application*/
    res.render('error404')
})

//PORT
app.listen(3000, function () {
    console.log("Le serveur tourne sur le port 3000");
})