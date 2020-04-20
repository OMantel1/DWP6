const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');

const auth = require('../middleware/auth');

router.get('/', sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, sauceCtrl.createSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;
