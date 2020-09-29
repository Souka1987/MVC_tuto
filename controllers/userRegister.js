//FORMULAIRE D4INSCRIPTION POUR LE VISITEUR FURTUR UTILISATEUR.

//Récupérer le schéma dpuis la base de données
const user = require('../database/models/user')

module.exports = (req, res) => {
    user.create(
        /*Je lui demande de récupérer les infos qui se trouvent dans le body = la page "register.hbs" =>
        "name", "email", "password", infos se trouvant dans la database voir "user.js"*/
        req.body, (error, user) => {

            // si il y a une erreur il reste sur la page où il se trouve.
            if (error) {
                return res.redirect('/user/create')
            }
            // si il n'y a pas d'erreur il repart sur la page d'acceuil.
            res.redirect('/')
        }
    )
}