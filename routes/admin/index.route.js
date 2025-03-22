// const product_route = require('./product-route');
const prefixAdmin = require('../../config/system') 
const homeroute = require('./dashboard.route');
const productRoutes = require('./product.route');
const productCategoryRouteS = require('./product-category.route');
module.exports=(app)=>{
    const path_admin = prefixAdmin.prefixAdmin;
    app.use(path_admin+"/dashboard",homeroute);
    app.use(path_admin+"/products",productRoutes);
    app.use(path_admin+"/products-category",productCategoryRouteS);
}


