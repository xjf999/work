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
    var sql="select * from addcat"
    connection.query(sql,(err,result)=>{
        res.render('mand',{data:result})
    })
});
router.get('/:id',(req,res)=>{
    var id=req.params.id;
    var sql="DELETE FROM addcat WHERE id= '"+id+"' " ;
    connection.query(sql,(err,result)=>{
        if(err){
            console.log(err)
            return;
        }
       res.redirect('/mand')
    })
});
router.post('/search',(req,res)=>{
    var name=req.body.sname;
    var sql = " select * from addcat where name='"+name+"' or people='"+name+"' or address='"+name+"' or phone='"+name+"' or userid='"+name+"' or id='"+name+"' ";
    connection.query(sql,(err,result)=>{
        console.log(sql)
        if(err){
            res.send("不存在")
        }else{
            res.render('mand',{data:result,sname:name});
        }
    })
})
module.exports=router;