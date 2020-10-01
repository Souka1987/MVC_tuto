const user = require('../database/models/user')


module.exports = (req, res, next) => {

//Connecte toi dans la base de données

user.findById(req.session.userId,(error, user) => {
    if(error || !user){
        return res.redirect('/')
    }
    next()
})

//Vérifie l'utilisateur



//si il est dans la base de données



//Sinon tu le rediriges


}