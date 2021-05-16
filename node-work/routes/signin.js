let express=require('express');
var mysql=require('mysql');
var crypto=require('crypto');
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    port:"3306",
    database:"project"
});

let router=express.Router();
router.get('/',(req,res)=>{
    res.render("signin")
});
router.post('/',(req,res)=>{
    let email=req.body.email;
    let name=req.body.name;
    let password=req.body.password;
    var hash=crypto.createHash('md5');
    hash.update(password);
    password=hash.digest('hex');
    var sql='select * from  user where useremail = "'+req.body.email+'" and userpassword = "'+req.body.password+'"';
    connection.query(sql,(err,result)=>{
        if(err){
          console.log(err)  ;
          return;
        };

        var user=result[0];
        if(!user){
            res.send("email或密码错误")
            return;
        }
        req.session.user=user;
        res.redirect("/shopping");
     });

})
module.exports=router;