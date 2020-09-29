const bcrypt = require('bcrypt')
const user = require('../database/models/user')

module.exports = (req, res) => {
    // Récupérer l'email et le mot de passe se trouvant dans le body "login.hbs"
    const {
        email,
        password
    } = req.body;

    //utilisateur enregistrés dans MongoDB (database)
    user.findOne({
        email
    }, (error, user) => {
        if (user) {
            //Pour comparer les passwords
            bcrypt.compare(password, user.password, (error, same) => { //Va aller chercher le password dans la database 
                if (same) { // Si il est semblable, redirige sur la page d'acceuil

                req.session.userId = user._id /*si l'on souhaite que l'utilisateur puisse éditer un article-
                celui-ci prend l'id de l'utilisateur se trouvant dans la database*/
                    res.redirect('/')

                } else { //Sinon reste sur la même page
                    res.redirect('/user/login')
                }
            })

        } else { //Si il ne  trouve pas le password dans la database, il reste sur la même âge

            return res.redirect('/user/login')
        }


    })
}