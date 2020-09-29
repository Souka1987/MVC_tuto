module.exports = (req, res) => {

    //si l'utilisateur a un id
    if (req.session.userId) {
        //tu peux donner accès à ceci, pour l'édition de l'article en question
        return res.render("article/add")
    }
  
    //sinon renvoyer à cette page-ci pour qu'il puisse se connecter
    res.redirect("/user/login")
}