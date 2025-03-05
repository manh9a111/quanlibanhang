const express = require('express');
const router= express.Router();
// const router   
const productcontroler = require('../../controllers/client/product.controller');
router.get('/',productcontroler.index);
router.get('/:slug',productcontroler.detail);
module.exports = router;
