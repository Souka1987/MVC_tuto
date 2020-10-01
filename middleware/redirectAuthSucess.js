const user = require('../database/models/user')


module.exports = (req, res, next) => {

    if (req.session.userId) {
        return res.redirect('/article/add')
    }
    next()

}