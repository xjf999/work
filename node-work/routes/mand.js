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
    var name=req.body.s_name;
    var userid=req.body.s_userid;
    var sql = " select * from addcat ";
    if(name){
        sql+= " and people = '" + name + "'";
    }
    if(userid){
        sql+= " and userid = '" + userid + "'";
    }
    sql=sql.replace("and","where");
    connection.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.render('mand',{data:result,s_name:name,s_userid:userid});
        }
    })
})
module.exports=router;