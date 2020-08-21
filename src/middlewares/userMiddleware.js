let usuario = 'Juan'

function userMiddleware(req, res, next) {
    if(req.session.usuario) {
        usuario = req.session.usuario;
        
    } else {
        usuario = 'Juan'
    }
    
    next()
}


module.exports = userMiddleware;