function authMiddleware(req, res, next) {
    if(req.session.usuario) {
        //console.log(req.session.usuario)
        next();
    } else {
        res.redirect('/')
    }
}

module.exports = authMiddleware;