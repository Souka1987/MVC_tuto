const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

//Pour faire fonctionner "express"
const app = express();

//Mongoose pour le lien avec nodejs. "blog" sera le nom de la base de données.
mongoose.connect('mongodb://localhost:27017/blog');


//Pour les images
app.use(express.static('public'));

//Route
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.get("/", function (req, res) {
    const salutation = ""
    res.render('index', 
    {hello:salutation}
    )
})

app.get("/contact", function (req, res) {
    res.render('contact')
})

//Port
app.listen(3000, function () {
    console.log("Le serveur tourne sur le port 3000");
})