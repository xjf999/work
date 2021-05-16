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
    res.render('siginup');
});
router.post('/',(req,res)=>{
    var sql='insert into user(username,useremail,userpassword) values(?,?,?)';
    let email=req.body.email;
    let name=req.body.name;
    let password=req.body.password;
    connection.query(sql,[name,email,password],(err,result)=>{
        if(err){
          console.log(err)  
        }
        res.redirect('/signin')
     });
    
});
module.exports=router;