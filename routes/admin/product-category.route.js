const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const validate = require("../../validates/admin/product-category.validate.js")
const upload = multer();

// const router   
const homecontroller = require('../../controllers/admin/product-category.controller');

router.get("/", homecontroller.index);
router.get("/create", homecontroller.create);
router.post("/create", upload.single('thumbnail'),
uploadCloud.upload,
validate.createPost ,
homecontroller.createPost
);
router.get("/edit/:id", homecontroller.edit);
router.get("/detail/:id", homecontroller.detail);
router.delete("/delete/:id", homecontroller.deleteItem);
router.patch("/change-status/:status/:id", homecontroller.changeStatus);
router.patch("/change-multi", homecontroller.changeMulti);
router.patch("/edit/:id",  upload.single('thumbnail'),uploadCloud.upload,validate.createPost ,homecontroller.editPatch);
module.exports = router;
