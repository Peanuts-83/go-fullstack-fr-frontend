// ROUTER d'Authentification
const express = require('express');
const router = express.Router();
const userCtl = require('../controlers/user')

router.post('/signup', userCtl.signUp);
router.post('/login', userCtl.login);


module.exports = router;