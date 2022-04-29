const {check} = require('express-validator');

const validation = [
     check('nom', 'Le nom doit contenir au moins 3 caractres').not().isEmpty().isLength({min:3}),
     check('prenom', 'Le penom doit contenir au moins 3 caractres').not().isEmpty().isLength({min:3}),
     check('email', 'Votre email n\'est pas conforme').not().isEmpty().isEmail(),
     check('password', 'Votre mot de passe doit contenir au moins quatre caracteres').not().isEmpty().isLength({min:4, max:16}),
     check('repeatePassword')
        .trim()
        .isLength({min:4, max:16})
        .custom( async (repeatePassword, {req}) =>{
            const password = req.body.password
            if(password !== repeatePassword){
                throw new Error('Mot de passe non identique');
              }
     })
]


module.exports = {validation};