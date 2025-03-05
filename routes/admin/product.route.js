const express = require('express');
const router = express.Router();
const multer = require('multer');
const storageMulter = require("../../heplers/storageMuter")
const validate = require("../../validates/admin/product.validate")
const upload = multer({ storage:storageMulter()});
// const router   
const homecontroller = require('../../controllers/admin/product.controller');
router.get("/", homecontroller.index);
router.patch("/change-status/:status/:id", homecontroller.changeStatus);
router.patch("/change-multi", homecontroller.changeMulti);
router.delete("/delete/:id", homecontroller.deleteItem);
router.get("/create", homecontroller.create);
router.post("/create", upload.single('thumbnail'),validate.createPost ,homecontroller.createPost);
router.get("/edit/:id", homecontroller.edit);
router.patch("/edit/:id",upload.single('thumbnail'),validate.createPost, homecontroller.editPatch);
router.get("/detail/:id", homecontroller.detail);
module.exports = router;
