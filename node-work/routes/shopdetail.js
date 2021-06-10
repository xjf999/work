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
router.get('/',(req,res)=>{
    var id=req.params.id;
    var img=req.body.img;
    var name=req.body.name;
    var price=req.body.price;
    var pprice=req.body.pprice;
    console.log(img,name,pprice,price);
    var sql="insert into cart(img,name,price,reprice) values('"+img+"','"+name+"','"+price+"','"+pprice+"') ";
    connection.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/cart')
    })
})
module.exports=router;