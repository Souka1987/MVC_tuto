const mongoose = require('mongoose')

//Récupérer le fichier "article" se trouvant dans "database"
const article = require('./database/models/article')

//connexion à la base de données
mongoose.connect('mongodb://localhost:27017/blog-test')


//Mise à jour de l'ID en remplaçant son titre pae exemple
article.findByIdAndUpdate("5f6db22261f54f2028b10c4b", 
{title: "Avenger EndGame"}, (error, post) => {
    console.log(error, post);
})




//trouver l'identifiant en question qui se trouve dans la collection "articles"
/*article.findById("5f6db22261f54f2028b10c4b", (error, articles) => {
    console.log(error, articles);
})



/*article.find({ //.find pour afficher du contenu.

    intro: 'Test d\'introduction'

}, (error, articles) => {
    console.log(error, articles);
})

//Enlever "string" et mettre des chaines de caractères.
/*article.create({
    title:"SpiderMan",
    intro:"Test d'introduction",
    content:"Critique sur le film Spider Man",
}, (error, post) => { //pour afficher l'erreur et la poster dans la database
console.log(error, post);

}
)*/