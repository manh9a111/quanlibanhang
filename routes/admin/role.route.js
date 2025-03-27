const express = require('express');
const router= express.Router();
// const router   
const homecontroller = require('../../controllers/admin/role.controller');
router.get("/",homecontroller.index);
router.get("/create",homecontroller.create);
router.post("/create",homecontroller.createPost);
module.exports = router;
