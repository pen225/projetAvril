const {check, validationResult} = require('express-validator');

const validation = [
     check('nom', 'Le nom doit contenir au moins 3 caractres').not().isEmpty().isLength({min:3}),
     check('prenom', 'Le penom doit contenir au moins 3 caractres').not().isEmpty().isLength({min:3}),
     check('email', 'Votre email n\'est pas conforme').not().isEmpty().isEmail(),
     check('password', 'Votre mot de passe doit contenir au moins quatre caracteres').not().isEmpty().isLength({min:4})
]


module.exports = validation;