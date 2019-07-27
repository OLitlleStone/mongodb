var express = require("express");
var app=express();
var MongoClient=require("mongodb").MongoClient;

app.get("/",function (req, res) {
    // Connection URL
    const url = 'mongodb://localhost:27017';
// Database Name
    const dbName = 'myproject';
    // Create a new MongoClient
    const client = new MongoClient(url);
    // Use connect method to connect to the Server
    client.connect(function(err) {
        if (err) {
            console.log("链接失败")
        }
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        // console.log(data)
        db.collection("restaurants").insertOne({
            "name":"哈哈",
            "age":parseInt(Math.random()*100+10)
        });
        client.close();
    });
    res.send("你好")
});
app.listen(3000);