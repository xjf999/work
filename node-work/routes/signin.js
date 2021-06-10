let express=require('express');
let router=express.Router();
let mysql=require('mysql');
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    port:"3306",
    database:"project"
});
router.get('/',(req,res)=>{
    res.render("signin")
});
router.post('/',(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    let sql='select * from  user where useremail = "'+email+'" and userpassword = "'+password+'"';
    connection.query(sql,(err,result)=>{
        if(err){
          console.log(err)  ;
          return;
        };
        var user=result[0];
        console.log(user);
        if(!user){
            res.send("email或密码错误")
            return;
        }
        res.redirect("/");
     });
     user=req.session.user;
})
module.exports=router;