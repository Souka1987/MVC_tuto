const mongoose = require('mongoose');

//Schema
const articleSchema = new mongoose.Schema({
    title:String,
    content:String,
    author:String,
    createDate: {
        type: Date,
        default: new Date() //=> La date sera créé au moment où l'on va créer l'article donc nul besion de le définir dans "add.hbs".
    }

})

//Modèle, pour mettre les infos dans la base de données.
const article = mongoose.model('article', articleSchema)

//On peut aussi le faire d'une autre manière
module.exports = article
