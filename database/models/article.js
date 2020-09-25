const mongoose = require('mongoose');

//Schema
const articleSchema = new mongoose.Schema({
    title:String,
    intro:String,
    content:String,

})

//Modèle, pour mettre les infos dans la base de données.
const article = mongoose.model('article', articleSchema)

//On peut aussi le faire d'une autre manière
module.exports = article
