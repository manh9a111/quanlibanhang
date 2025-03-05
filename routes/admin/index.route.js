// const product_route = require('./product-route');
const prefixAdmin = require('../../config/system') 
const homeroute = require('./dashboard.route');
const procuctroute = require('./product.route');
module.exports=(app)=>{
    const path_admin = prefixAdmin.prefixAdmin;
    app.use(path_admin+"/dashboard",homeroute);
    app.use(path_admin+"/products",procuctroute);
}


