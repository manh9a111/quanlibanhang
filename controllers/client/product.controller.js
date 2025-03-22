// module.exports.index = (req,res)=>{
//     res.render('client/page/home/index');
//   };
const Product = require("../../models/product.model");

module.exports.index = async(req,res)=>{
    

    
const products = await Product.find({
    status: "active",
    deleted: false
}).sort({ position: "desc" });
products.forEach(item =>{
    item.pricenew=item.price-(item.price*(item.discountPercentage)/100).toFixed(0);
})
// console.log(products)
    res.render('client/page/products/index',{
        pageTitle:"trang Danh sách sản phẩm",
        products: products,
        // filterstatus:filterstatus
    });
  };
module.exports.detail = async(req,res)=>{


    try {
        const find ={
            deleted : false,
            slug:req.params.slug,
            status:"active"
        }
        const product = await Product.findOne(find);
      
        res.render('client/page/products/detail', {
            pageTitle:product.title,
            product:product
        });
    } catch (error) {
        res.redirect(`/products`);
    }
        
      };
    