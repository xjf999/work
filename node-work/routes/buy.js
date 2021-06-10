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
    var user=req.session.user;
    var sql='select p.pname,p.img,p.price,u.useremail,u.username from product as p inner join user as u on p.id=u.userid where p.id="'+user.id+'"';
    connection.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }
        res.render('buy',{data:result})
    })
})
module.exports=router;