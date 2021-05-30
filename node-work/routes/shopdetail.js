var express=require('express');
var mysql=require('mysql');
var router=express.Router();
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'project'
});
router.get('/:id',(req,res)=>{
    var id=req.params.id;
    var sql="select * from product where id='"+id+"'";
    connection.query(sql,(err,result)=>{
        res.render('shopdetail',{data:result});
    })
    
})
module.exports=router;