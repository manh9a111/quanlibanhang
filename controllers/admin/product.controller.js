const Product = require("../../models/product.model");
const filterstatushelper = require("../../heplers/filterstatus");
const searchhelper = require("../../heplers/search");
const { on } = require("nodemon");
const systemConfig = require("../../config/system")
const pagination = require("../../heplers/pagination");
module.exports.index = async (req, res) => {
    const filterstatus = filterstatushelper(req.query);
    let find = {
        deleted: false
    };
    if (req.query.status) {
        find.status = req.query.status;
    }
    const search = searchhelper(req.query);
    if (search.regex) {
        find.title = search.regex;
    }
    const countproduct = await Product.countDocuments(find);
    let objectPagination = pagination(
        {
            currentPage: 1,
            limititem: 4
        },
        req.query,
        countproduct
    )
    // if(req.query.page){
    //     objectPagination.currentPage = parseInt(req.query.page);
    // }
    // const countproduct= await Product.countDocuments(find);
    // const totalPage  = Math.ceil(countproduct/objectPagination.limititem);
    // objectPagination.totalPage = totalPage;
    // console.log(objectPagination.currentPage);
    // objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limititem;
    const products = await Product.find(find).sort({ position: "desc" }).limit(objectPagination.limititem).skip(objectPagination.skip);
    products.forEach(item => {
        item.pricenew = item.price - (item.price * (item.discountPercentage) / 100).toFixed(0);
    })
    // console.log(products)
    res.render('admin/page/products/index', {
        pageTitle: "trang Danh sách sản phẩm",
        products: products,
        filterstatus: filterstatus,
        keyword: search.keyword,
        pagination: objectPagination
    });
};
module.exports.changeStatus = async (req, res) => {
    // console.log(req.params);
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { status: status });
    req.flash("success","cập nhật trạng thái thành công!");
    res.redirect("back");
}
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            req.flash("success",`cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            req.flash("success",`cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: "true",
                deletedAt: new Date()
            });
            req.flash("success",`Đã xoá thành công ${ids.length} sản phẩm!`);
            break;
        case "change-position":

            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);

                await Product.updateMany({ _id: { $in: id } }, { position: position });
            };
            req.flash("success",`cập nhật thành công vị trí ${ids.length} sản phẩm!`);
            break;
        default:
            break;
    }
    res.redirect("back");
}
module.exports.deleteItem = async (req, res) => {
    // console.log(req.params);

    const id = req.params.id;
    await Product.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    });
    req.flash("success",`Đã xoá thành công 1 sản phẩm!`);
    res.redirect("back");
}
module.exports.create = async(req,res)=>{
    res.render('admin/page/products/create', {
        pageTitle: "Thêm mới sản phẩm"
    });
}
module.exports.createPost = async(req,res)=>{
    
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position==""){
        const countProduct = await Product.countDocuments();
        req.body.position = countProduct+1;
        
    }else{
        req.body.position = parseInt(req.body.position);
    }
   
    
    const product = new Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`)
}
module.exports.edit = async(req,res)=>{
    try {
        const find ={
            deleted : false,
            _id:req.params.id
        }
        const product = await Product.findOne(find);
        console.log(product)
        res.render('admin/page/products/edit', {
            pageTitle: "Chỉnh sửa sản phẩm",
            product:product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}
module.exports.editPatch = async(req,res)=>{
    const id= req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    
    try {
        await Product.updateOne({
            _id:id
        },req.body);
        req.flash("success","cập nhật thành công!");
    } catch (error) {
        req.flash("error","cập nhật thất bại!");
    }
    res.redirect("back");
}
module.exports.detail = async(req,res)=>{
    try {
        const find ={
            deleted : false,
            _id:req.params.id
        }
        const product = await Product.findOne(find);
        console.log(product)
        res.render('admin/page/products/detail', {
            pageTitle:product.title,
            product:product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}