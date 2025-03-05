const multer = require('multer');
module.exports = ()=>{
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
          cb(null, './public/uploads/');
        },
        filename: function(req, file, cb) {
            const uniqueSuffix = Date.now();
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      });
      var upload = multer({ storage: storage });
      return storage;
}
