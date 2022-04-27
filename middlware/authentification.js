let jwt = require('jsonwebtoken');
const mysqlConnexion = require('../database');
require('dotenv').config()


const authen = (req, res, next) => {
    if (req.cookieOption.jwt) {
        try {
            const decodeToken = jwt.verify(req.cookieOption.jwt, process.env.JWT_COOKIE_EXPIR);
            mysqlConnexion.query('select * from user where id = ?', [decodeToken.id], (err, rs) => {
                if (!rs) {
                    return next()
                }
                req.user = rs[0]
                return next()
            })
        } catch (error) {
            console.log(error);
            return next()
        }
    }else{
        res.redirect('/connexion');
        next()
    }
}

module.exports = authen;