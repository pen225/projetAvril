// let jwt = require('jsonwebtoken');
// const mysqlConnexion = require('../database');
// require('dotenv').config()


// const authen = (req, res, next) => {
//     if (req.cookieOption.jwt) {
//         try {
//             const decodeToken = jwt.verify(req.cookieOption.jwt, process.env.JWT_COOKIE_EXPIR);
//             mysqlConnexion.query('select * from user where id = ?', [decodeToken.id], (err, rs) => {
//                 if (!rs) {
//                     return next()
//                 }
//                 req.user = rs[0]
//                 return next()
//             })
//         } catch (error) {
//             console.log(error);
//             return next()
//         }
//     }else{
//         res.redirect('/connexion');
//         next()
//     }
// }




   
const req = require('express/lib/request');
require('dotenv').config()
const jwt = require('jsonwebtoken');

const userToken = class{
    static creatToken = (data) =>{
        let user = {
            nom : data.nom,
            prenom : data.prenom,
            email : data.email,
            password : data.password
        }
        let token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_TEMP_EXPIR
        })
        console.log(token)
        return token;
    }

    static verifToken = (token) =>{
        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(decoded);
            return {success: decoded}
          } catch {
            // err
            console.log("Token non valide");
            return {error: "Token non valide"}
        }
    }

}


module.exports = userToken;