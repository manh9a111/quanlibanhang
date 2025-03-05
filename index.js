const express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
const flash = require('express-flash');

const cookieParser = require('cookie-parser');
const session = require('express-session');
// const mongoose = require('mongoose');
const app = express();
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
const system = require('./config/system');
const database = require("./config/database");
require('dotenv').config();
const router = require('./routes/client/index-routes'); 
const routeradmin = require('./routes/admin/index.route');
app.use(cookieParser('keyboardcatgdsfgdf'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// mongoose.connect(process.env.Mongo_url);
app.locals.prefixAdmin = system.prefixAdmin;
database.connect();
const port = process.env.PORT;
router(app);
routeradmin(app);
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`); // Thư mục chứa các file Pug

app.use(express.static(`${__dirname}/public`));
app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
