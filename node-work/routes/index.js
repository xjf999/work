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
        res.render('index',{data:result})
    })
});
router.post('/',(req,res)=>{
    var name=req.body.sname;
    var sql="select * from product where pname='"+name+"' or type='"+name+"'";
    connection.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }
        res.render("index",{title: 'Express',data:result,sname:name})
    })
})
module.exports=router;