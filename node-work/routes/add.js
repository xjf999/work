let express=require("express");
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
    res.render('add')
})
router.post('/',(req,res)=>{
    let name=req.body.name;
    let address=req.body.address;
    let people=req.body.people;
    let phone=req.body.phone;
    let userid=req.body.userid;
    let sql='insert into addcat(name,address,people,phone,userid)  values(?,?,?,?,?)';
    connection.query(sql,[name,address,people,phone,userid],(err,result)=>{
        if(err){
            console.log(err)
            return;
        }
        res.redirect('/mand')
    })
})
module.exports=router;