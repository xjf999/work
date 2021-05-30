let express=require('express');
let router=express.Router();
var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'project'
});
router.get('/',(req,res)=>{
    var sql="select * from product"
    connection.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }
        res.render('shopping',{data:result})
    })
});
module.exports=router;