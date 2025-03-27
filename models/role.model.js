const mongoose = require("mongoose");
const roleschema = new mongoose.Schema({
    title: String,
   description:String,
   permission:{
    type:Array,
    default:[]
   },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});
const Role = mongoose.model("Role", roleschema, "roles");
module.exports = Role;

