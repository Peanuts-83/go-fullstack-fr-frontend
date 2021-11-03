// ROUTER
const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controlers/stuff');
const auth = require('../controlers/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffCtrl.postThing);
router.get('/:id', auth, stuffCtrl.getOne);
router.put('/:id', auth, multer, stuffCtrl.putThing);
router.get('/', auth, stuffCtrl.getThings);
router.delete('/:id', auth, stuffCtrl.deleteOne);

module.exports = router;