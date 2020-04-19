const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');

router.get('/sauces', sauceCtrl.getAllSauces);
router.get('/sauces/:id', sauceCtrl.getOneSauce);
router.post('/sauces', sauceCtrl.createSauce);
router.put('/sauces/:id', sauceCtrl.modifySauce);
router.delete('/sauces/:id', sauceCtrl.deleteSauce);

module.exports = router;
