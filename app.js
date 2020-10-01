//Définir les constantes
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
//le flash est une zone spéciale de la session servant à stocker les infos utilisateur.
const connectFlash = require('connect-flash')



//CONTROLLERS

//Articles
const articleSingleController = require('./controllers/articleSingle')
const articleAddController = require('./controllers/articleAdd')
const articlePostController = require('./controllers/articlePost')
const homePage = require('./controllers/homePage')


//Users
const userCreate = require('./controllers/userCreate')
const userRegister = require('./controllers/userRegister')
const userLogin = require('./controllers/userLogin')
const userLoginAuth = require('./controllers/userLoginAuth')
const userLogout = require('./controllers/userLogout')

//ENV
require('dotenv').config()
//console.log(process.env);
//require('./console')

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

//Authentification
const auth = require("./middleware/auth");
//Le flash est généralement utilisé en combinaison avec des redirections, garantissant que le message est disponible sur la page suivante à rendre.
const redirectAuthSucess = require('./middleware/redirectAuthSucess')

//Pour les images
app.use(express.static('public'));

//Route
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use('*', (req, res, next) =>{ //pour voir les numéros d'identification de l'user
    res.locals.user = req.session.userId;
    console.log(res.locals.user);
    next()
})


//Middleware
const articleValidPost = require('./middleware/articleValidPost')
app.use("/articles/post", articleValidPost)
app.use("/article/add", auth)

app.get("/", homePage)

//Articles
//Définir l'url
app.get("/article/add", articleAddController)
app.get("/articles/:id", articleSingleController)
app.post("/articles/post", articlePostController)

const article = require('./database/models/article')

//Users
app.get("/user/create", redirectAuthSucess, userCreate)
app.post("/user/register", redirectAuthSucess, userRegister)
app.get("/user/login", redirectAuthSucess, userLogin)
app.post('/user/loginAuth',redirectAuthSucess, userLoginAuth)
app.get('/user/logout', userLogout) //se déconnecter sans redirection


//Définir la page "contact"
app.get("/contact", (req, res) => {
    res.render('contact')
})


//Port
app.listen(3000, function () {
    console.log("Le serveur tourne sur le port 3000");
})