const product_route = require('./product-route');
const homeroute = require('./home.route');
module.exports=(app)=>{
    app.use("/",homeroute);
    app.use("/products",product_route);
}


