var express= require("express")
var app = express();
var db=require("./modle/db.js");

app.get("/insert",function (req, res) {
        db.insertEle("student",{"name":"小明","age":parseInt(Math.random()*100+10)},function (err,result) {
        if (err){console.log("插入失败");return;}
        // res.send(result);
    });
});
/*app.get("/du",function (req, res) {
    //这个页面现在接收一个page参数
    var page=parseInt(req.query.page);//express中读取get参数很简单
    // var page=req.query.page;//express中读取get参数很简单
    var a=[];
    db.find("student",{},function (err, result) {//result是一个数组
        for (var i=10*page;i<10*(page+1);i++){
            a.push(result[i]);
            // res.json({"result":result});
            // res.send(result);
        }
        res.send(a);
        // res.send(result);
    });
});*/
app.get("/du",function (req, res) {
    var page=parseInt(req.query.page);//express中读取get参数很简单
    //查找四个参数，在哪个集合查，查什么，分页设置，查完之后做什么
    db.find("student",{},{"pageamout":5,"page":page},function (err, result) {//result是一个数组
        if (err) {console.log(err);}
        res.send(result);
        // res.send(result);
    });
});

app.get("/delete",function (req, res) {
    var name=req.query.name;
    db.deleteMany("student",{"name":name},function (err, result) {
        res.send(result);
    })
})

//修改
app.get("/update",function (req, res) {
    var borough=req.query.borough;
    db.updateMany(
        "student",//集合名字
        {"name":"小草"},//改什么
        {
        $set:{age:30}//怎么改
    },function (err, result) {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
})

app.listen(3000);