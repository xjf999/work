let express=require('express');
let router=express.Router();
router.get('/',(req,res)=>{
    res.render('about-startup')
});
module.exports=router;