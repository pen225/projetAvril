const express = require('express');
const userController = require('../controller/control');
const authen = require('../middlware/authentification');
const {validation} = require('../middlware/validator');


const router = express.Router();


router.get('/', userController.accueil);
router.get('/inscription', userController.getInscription);
router.get('/connexion', userController.getConnexion);
router.get('/dashboard', userController.getDashboard);

router.post('/inscription', validation, userController.postInscription);
router.post('/connexion', userController.postConnexion);


module.exports = router;