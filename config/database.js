const mongoose = require('mongoose');
module.exports.connect = async () =>{
    try {
       await mongoose.connect(process.env.Mongo_url);
       console.log("ket noi thanh cong");
    } catch (error) {
        console.log("ket noi that bai");
    }
}
