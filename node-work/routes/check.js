var express=require("express");
var router=express.Router();
var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'project'
});
router.get('/:id',(req,res)=>{
    var id=req.params.id;
    var sql="select * from addcat where id='"+id+"'";
    connection.query(sql,(err,result)=>{
        if(err){
            console.log(err) 
        }else{
             res.render('check',{data:result})
        }
    })
})
router.post('/',(req,res)=>{
    let id=req.body.id;
    let userid=req.body.userid;
    let name=req.body.name;
    let address=req.body.address;
    let people=req.body.people;
    let phone=req.body.phone;
    let sql='update addcat set name="'+name+'", address="'+address+'",people="'+people+'",phone="'+phone+'",userid="'+userid+'" where id="'+id+'" ';
    connection.query(sql,(err,result)=>{
        if(err){
            console.log(err)
            return;
        }
       res.redirect("/mand")
    })
})
module.exports=router;