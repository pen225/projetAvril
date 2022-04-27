const express = require('express');
const userController = require('../controller/control');
const authen = require('../middlware/authentification');
const router = express.Router();


router.get('/', userController.accueil);
router.get('/inscription', userController.getInscription);
router.get('/connexion', userController.getConnexion);

router.post('/inscription', userController.postInscription);
router.post('/connexion', userController.postConnexion);


module.exports = router;