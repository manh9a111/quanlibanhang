const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system")
const createTreeHelper = require("../../heplers/createTree")
const filterstatushelper = require("../../heplers/filterstatus");
const searchhelper = require("../../heplers/search");
const pagination = require("../../heplers/pagination");
const { on } = require("nodemon");
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };
    const filterstatus = filterstatushelper(req.query);
    if (req.query.status) {
      find.status = req.query.status;
  }
  const search = searchhelper(req.query);
  if (search.regex) {
      find.title = search.regex;
  }
  const countproductCategory = await ProductCategory.countDocuments(find);
  let objectPagination = pagination(
      {
          currentPage: 1,
          limititem: 4
      },
      req.query,
      countproductCategory
  )
  let sort = {

  };
  if(req.query.sortKey && req.query.sortValue){
      sort[req.query.sortKey] = req.query.sortValue;
  }else{
      sort.position = "desc";
  }
  
  const productsCategory = await ProductCategory.find(find).sort(sort).limit(objectPagination.limititem).skip(objectPagination.skip);
  productsCategory.forEach(item => {
      item.pricenew = item.price - (item.price * (item.discountPercentage) / 100).toFixed(0);
  })
    const newRecords = createTreeHelper.Tree(productsCategory)
    // console.log(products)
    res.render('admin/page/products-category/index', {
        pageTitle: "trang danh mục sản phẩm",
        records:newRecords,
        filterstatus: filterstatus,
        keyword: search.keyword,
        pagination: objectPagination
    });
};

module.exports.create = async (req, res) => {
    let find = {
        deleted : false
    }
    
      
    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.Tree(records)
    // console.log(newRecords)
    res.render('admin/page/products-category/create', {
        pageTitle: "Tạo danh mục",
        records:newRecords
    });
};
module.exports.createPost = async(req,res)=>{
    if(req.body.position==""){
        const countProduct = await ProductCategory.countDocuments();
        req.body.position = countProduct+1;
    }else{
        req.body.position = parseInt(req.body.position);
    }
    const record = new ProductCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
 
}
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id; 
  const data = await ProductCategory.findOne({
    _id: id,
    deleted:false
  });
  const records = await ProductCategory.find({
    deleted : false
});
const newRecords = createTreeHelper.Tree(records)
// console.log(records)
  res.render('admin/page/products-category/edit', {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      data:data,
      records:newRecords
  });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  }
};
module.exports.editPatch = async (req, res) => {
  const id = req.params.id; 
  req.body.position = parseInt(req.body.position)
  await ProductCategory.updateOne({
    _id:id},
    req.body
  );
  res.redirect("back")
};
module.exports.detail = async(req,res)=>{
  try {
      const find ={
          deleted : false,
          _id:req.params.id
      }
      const productCategory = await ProductCategory.findOne(find);
   
      res.render('admin/page/products-category/detail', {
          pageTitle:productCategory.title,
          productCategory:productCategory
      });
  } catch (error) {
      res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
}
module.exports.deleteItem = async (req, res) => {
  // console.log(req.params);

  const id = req.params.id;
  await ProductCategory.updateOne({ _id: id }, {
      deleted: true,
      deletedAt: new Date()
  });
  req.flash("success",`Đã xoá thành công 1 danh mục sản phẩm!`);
  res.redirect("back");
}
module.exports.changeStatus = async (req, res) => {
  // console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;
  await ProductCategory.updateOne({ _id: id }, { status: status });
  req.flash("success","cập nhật trạng thái thành công!");
  res.redirect("back");
}
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
      case "active":
          await ProductCategory.updateMany({ _id: { $in: ids } }, { status: "active" });
          req.flash("success",`cập nhật trạng thái thành công ${ids.length} danh mục sản phẩm!`);
          break;
      case "inactive":
          await ProductCategory.updateMany({ _id: { $in: ids } }, { status: "inactive" });
          req.flash("success",`cập nhật trạng thái thành công ${ids.length} danh mục sản phẩm!`);
          break;
      case "delete-all":
          await ProductCategory.updateMany({ _id: { $in: ids } }, {
              deleted: "true",
              deletedAt: new Date()
          });
          req.flash("success",`Đã xoá thành công ${ids.length} danh mục sản phẩm!`);
          break;
      case "change-position":

          for (const item of ids) {
              let [id, position] = item.split("-");
              position = parseInt(position);

              await ProductCategory.updateMany({ _id: { $in: id } }, { position: position });
          };
          req.flash("success",`cập nhật thành công vị trí ${ids.length} danh mục sản phẩm!`);
          break;
      default:
          break;
  }
  res.redirect("back");
}