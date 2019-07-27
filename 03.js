var express=require("express");
var app=express();
var db=require("./modle/db.js");

//设置模板引擎
app.set("view engine","ejs");

//静态出来public中的东西
app.use(express.static("./public"))
//显示留言列表
app.get("/",function (req,res,next) {
    res.render("index");
});

//增加留言
app.listen(3000);