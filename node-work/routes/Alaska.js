var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'project'
});
router.get('/',(req,res)=>{
    var sql="select * from product where type='Alaska'";
    connection.query(sql,(err,result)=>{
        res.render('Alaska',{data:result})
    })
})
module.exports=router;