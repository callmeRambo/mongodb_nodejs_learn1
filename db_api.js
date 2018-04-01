var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var dbName = "demo";
var collectionName = "User";
//var myobj = {"name": "pangpangzhang", "password": "nmh" };
//insertCollection( dbName, collectionName, myobj);
// insert data
function insertCollection (dbName, collectionName, myobj) {	 
	MongoClient.connect(url, function (err, client) {
	    if (err) throw err;

	    var db = client.db(dbName);

	    db.collection(collectionName).insertOne(myobj, function(err, res) {
	        if (err) throw err;
	        console.log("文档插入成功");
	        client.close();
	    });
	});
}

// function findOne(dbName, collectionName, whereStr) { 
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db(dbName);
//         dbo.collection(collectionName).find(whereStr).toArray(function(err, result) {
//             if (err) throw err;
//             //console.log(result);
//             db.close();
//         });
//         //console.log(result);
//     });
//     //console.log(x);}
// }

//var myobj = {"name": "pangpangzhang", "password": "nmh" };
//insertCollection( dbName, collectionName, myobj);


// function findOne(dbName, collectionName, whereStr) { 
//     var param = [dbName, collectionName, whereStr];
//     results =function(param, callback){
//         MongoClient.connect(url, function(err, db) {
//             if (err) throw err;
//             var dbo = db.db(param[0]);
//             dbo.collection(param[1]).find(param[2]).toArray(function(err, result) {
//                 if (err) throw err;
//                 callback(null, result);
//                 //console.log(result);
//                 db.close();
//             });
//             //console.log(result);
//         });
//     }
//     results(param, function(err, data){
//         if (err) {
//             throw err;
//         }
//         _result = data;
//         //console.log(_result)
//         //return data;
//     });
// }
    

//     return res;
// }

function findOne(dbName, collectionName, whereStr) { 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(collectionName).find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            if(doc == 1){  
                console.log(query.name + ": 登陆成功 " + new Date());  
                res.render('ucenter', { user:doc });  
            }else{  
                console.log(query.name + ": 登陆失败 " + new Date());  
                res.redirect('/');  
            // }  
        //     console.log(result);
        //     fs.writeFile('./wfile.txt',result,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
        //         if(err){
        //             console.log("文件写入失败");
        //         }else{
        //             console.log("文件写入成功");
        //         }
           
        //    }) 
            db.close();
        });
        //console.log(result);
    });
    //console.log(x);}
}

function check(dbName, collectionName, whereStr) { 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(collectionName).find(whereStr).toArray(function(err, result) {
            if (err) {  
                console.log(" 登陆失败 " + new Date());  
                res.redirect('/');  
             }
             else{  
                console.log(" 登陆成功 " + new Date());  
                res.render('ssssssssssssssssssss');  
             }  
            db.close();
        });
    });
}


function find(){
    console.log('2');
    fs.readFile('./wfile.txt','base64',function(err,data){
        if(err){
            console.log("取file1失败");
        }else{
            console.log("取file1");
            return data;
        }
    });
}
function sleep(delay)
{
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}


// var whereStr = {"password": "nmh" };
// console.log('1');
// var start = async function(){
//     console.log('start');
//     await findOne(dbName, collectionName, whereStr);
//     console.log('end');
// }
//var _result = find();
//console.log(_result);
//findOne(dbName, collectionName, whereStr);
//sleep(1000);

var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    })
};

var start = async function () {
    // 在这里使用起来就像同步代码那样直观
    console.log('start');
    await sleep(3000);
    console.log('end');
};

start();

// find all data
function findAll(dbName, collectionName){
    var _result;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);

        dbo.collection(collectionName). find({}).toArray(function(err, result) { 
        // 返回集合中所有数据
            if (err) throw err;
            console.log(result);
            _result = result;
            db.close();
    		//return result;
        });
    });
    return _result;
}


// below are the testing code 

//var dbName = "test";
//var collectionName = "site";
///var myobj = {"name": "yunqiu", "password": "papapa" };

//var whereStr = {"name": 'yunqiu'};

// test three API

// insertCollection(dbName, collectionName, myobj);

// var result = findOne(dbName, collectionName, whereStr);
// console.log(result.password);

// here couldn't print cause in the findOne(), it can't return the result
//console.log(findOne(dbName, collectionName, whereStr));

// findAll(dbName, collectionName);