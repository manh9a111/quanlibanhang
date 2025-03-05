// module.exports.index = (req,res)=>{
//     res.render('client/page/home/index');
//   };
module.exports.index = (req,res)=>{
  res.render('client/page/home/index',{
    pageTitle:"TRANG CHỦ"
  });
};