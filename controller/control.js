const bcrypt = require('bcryptjs')
const {request, response} = require('express');
const userQuery = require('../query');
let jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = class {
    static accueil = (req = request, res = response) => {
        if (req.session.dataUser) {
            res.render('index');
        }else{
            res.redirect('/connexion')
        }
    }

    static getInscription = (req = request, res = response) => {
        res.render('inscription');
    }

    static getConnexion = (req = request, res = response) => {
        if (req.session.dataUser) {
            res.redirect('/')
        }
        res.render('connexion');
    }

    static postInscription = (req = request, res = response) => {
        let {nom, prenom, email, password, repeatPassword} = req.body;
        userQuery.verifEmail(req.body)
        .then(success => {
            console.log('success', success);
            if (success.length > 0) {
                return res.render('inscription', {message: 'Email exist'});
            } else if (password !== repeatPassword) {
                return res.render('inscription', {message: 'Les mot de passe n\'est pas conforme'});
            } else{
                userQuery.insertUser(req.body)
                return res.redirect('/connexion')
            }
            
        })
        .catch(error => {
            console.log(error);
        })
    }

    static postConnexion = (req = request, res = response) => {
        let {email, password} = req.body;
        userQuery.connexion(req.body)
        .then(success => {
            console.log('connexion', success);
            if (success.length == 0 || ! (bcrypt.compareSync(password, success[0].password))) {
                console.log('Email ou mot de passe incorrect');
                return res.render('connexion', {message: 'Email ou mot de passe incorrect'});
            } else {
                const id = success[0].user_id;
                const user = success[0];
                const token = jwt.sign({user:user}, process.env.JWT_SECRET_KEY, {
                    expiresIn: process.env.JWT_TEMP_EXPIR
                })

                console.log('token', token);
                const cookieOption = {
                    expire: new Date(Date.now()+process.env.JWT_COOKIE_EXPIR * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOption)
                req.session.dataUser = user;
                console.log('req.session.dataUser', req.session.dataUser);
                res.redirect('/');
            }
        })
        .catch(error => {
            console.log(error);
        })

        
    }

}

module.exports = userController;