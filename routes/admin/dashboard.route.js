const express = require('express');
const router= express.Router();
// const router   
const homecontroller = require('../../controllers/admin/dashboard.controller');
router.get("/",homecontroller.index);
module.exports = router;
