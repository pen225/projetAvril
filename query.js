const mysqlConnexion = require("./database");
const bcrypt = require('bcryptjs')

const userQuery = class{
    static verifEmail = (data) => {
        return new Promise ((resolve, reject) => {
            let {nom, prenom, email, password} = data;
            mysqlConnexion.query('select email from user where email = ?', [email], (err, rs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rs);
                }
            })
        })
    }

    static insertUser = (data) => {
        return new Promise ((resolve, reject) => {
            let {nom, prenom, email, password} = data;
            let hashpassword = bcrypt.hashSync(password, 10)
            mysqlConnexion.query('insert into user (nom, prenom, email, password) values (?, ?, ?, ?)', [nom, prenom, email, hashpassword], (err, rs) => {
                if (rs) {
                    resolve(rs)
                } else {
                    reject(err)
                }
            })
        })
    }

    static connexion = (data) => {
        return new Promise ((resolve, reject) => {
            let {email,password} = data;
            mysqlConnexion.query('select * from user where email = ?', [email], (err, rs) => {
                if (rs) {
                    resolve(rs)
                } else {
                    reject(err)
                }
            })
        })
    }
}


module.exports = userQuery;