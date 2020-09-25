const mongoose = require('mongoose')

//Récupérer le fichier "article" se trouvant dans "database"
const article = require('./database/models/article')

//connexion à la base de données
mongoose.connect('mongodb://localhost:27017/blog-test')

//Enlever "string" et mettre des chaines de caractères.
article.create({
    title:"Avenger EndGame",
    intro:"Test d'introduction",
    content:"Critique sur le film",
}, (error, post) => { //pour afficher l'erreur et la poster dans la database
console.log(error, post);

}
)