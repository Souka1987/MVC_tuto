module.exports = (req, res) => {
    req.session.destroy(() =>{ //Pour détruire la session de l'utilisateur
        res.redirect('/') //Redirige vers la page d'accceuil
    })
}