var MongoClient=require("mongodb").MongoClient;
var settings=require("../setting.js");
function _connectDB(callback) {
    var url=settings.durl;//从setting文件中，读数据地址
    MongoClient.connect(url,function (err, client) {
        callback(err,client)
        });
}
exports.insertEle=function(collectionName,json,callback){
    //连接数据库，连接之后查找所有
    _connectDB(function (err, client) {
        if (err){
            callback(err,client);
            return;
        }
        const db = client.db(collectionName);//选择的数据库的名字
        db.collection(collectionName).insertOne(json,function (err, result) {//collectionName是选择的集合的名字
            callback(err,result);
            client.close();//关闭数据库
        });
    });
};
exports.find=function (collectionName, json,args, callback) {
    var result=[];//结果数组
    if (arguments.length!=4){
        callback("find函数接收3个参数",null);
        return;
    }
    //应该省略的条数
    var skipnumber=args.pageamout*args.page;
    //数目限制
    var limit=args.pageamout;
    console.log(skipnumber,limit);
    _connectDB(function (err, client) {
        const db = client.db(collectionName);//选择的数据库的名字
        var cursor=db.collection(collectionName).find(json).skip(skipnumber).limit(limit);
        cursor.each(function (err,doc) {
            if (err) {
                callback(err,null)
                return;
            }
            if (doc!=null){
                result.push(doc)
                // callback(null,doc);
            } else{
                //遍历结束没有更多的文档
                callback(null,result);
                console.log(result);
                client.close();//关闭数据库
            }
        })
    })
}

//删除
exports.deleteMany=function (collectionName, json, callback) {
    _connectDB(function (err,client) {
        const db = client.db(collectionName);//选择的数据库的名字
        db.collection(collectionName).deleteMany(
            json,
            function (err,results) {
                console.log(results);
                callback();
                client.close();//关闭数据库
            }
        );
    })
};

//修改
exports.updateMany=function (collectionName,json1,json2,callback) {
    _connectDB(function (err, client) {
        const db = client.db("local1");//选择的数据库的名字
        db.collection(collectionName).updateMany(
            json1,
            json2,
            function (err, results) {
                // console.log(results);
                callback(err, results);
                client.close();//关闭数据库
            }
        )
    })
}
