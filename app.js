//Définir les constantes
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const Article = require('./database/models/article');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')



//CONTROLLERS

//Articles
const articleSingleController = require('./controllers/articleSingle')
const articleAddController = require('./controllers/articleAdd')
const articlePostController = require('./controllers/articlePost')
const homePage = require('./controllers/homePage')

//Middleware
//const articleValidPost = require('./middleware/articleValidPost')


//User
const userCreate = require('./controllers/userCreate')
const userRegister = require('./controllers/userRegister')
const userLogin = require('./controllers/userLogin')
const userLoginAuth = require('./controllers/userLoginAuth')




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


//Pour faire fonctionner "express"
const app = express();

//MongoStore
const mongoStore = MongoStore(expressSession) //connection du module "MongoStore" dans "expressSession"

//User
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
const auth = require("./middleware/auth")

//Pour les images
app.use(express.static('public'));

//Route
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');



//Middleware
const articleValidPost = require('./middleware/articleValidPost')
app.use("/articles/post", articleValidPost)
app.use("/articles/add", auth)

app.get("/", homePage)

//Articles
//Définir l'url
app.get("/article/add", /*auth,*/ articleAddController)
app.get("/articles/:_id", articleSingleController)
app.post("/articles/post", /*auth, articleValidPost,*/ articlePostController)


//User
app.get("/user/create", userCreate)
app.post("/user/register", userRegister)
app.get("/user/login", userLogin)
app.post('/user/loginAuth', userLoginAuth)


//Définir la page "contact"
app.get("/contact", (req, res) => {
    res.render('contact')
})


//Port
app.listen(3000, function () {
    console.log("Le serveur tourne sur le port 3000");
})