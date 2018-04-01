在node.js开发过程中会遇到层层回调，虽然回调是node.js的优势所在，但同样也是坑。有如下场景需要返回多层回调函数中的结果：
```js
http.request("/url", function(res){
    obj.get(res, function(res2){
        obj.get(res2,function(res3){
            //此处可以得到res3
        });
    });
    console.log('结束');
});
```
假如有一个函数
```js
var func1 = function() {
    //在这里会用到上面的那段代码
}


router.get('url', function(req, res) {
    http.request("/url", function(res) {
        obj.get(res, function(res2) {
            obj.get(res2,function(res3) {
                //得到res3后传值到页面
                res.render('html',{res:res3})
            });
        });
    });
});
```

如果我们有多个路由都需要用到那段代码的返回值,我们或许会把它提取出来当做一个公共的部分来使用，于是把它放到一个函数中：
```js
var func2= function(){  
    http.request("/url", function(res){  
        obj.get(res, function(res2){  
            obj.get(res2,function(res3){  
                //在此处返回得到的值  
                returen res3;  
            });  
        });
        console.log('结束');
    });
}
```
然后在每个路由中调用，可是结果却出人意料，在调用func2()以后并没有得到想要的结果res3，事实上已经输出了“结束”两字。
<br>其实这就是node.js的异步回调导致的结果，整个代码段走完了，回调函数中的值却没有返回。
<br>那该怎么办？解决办法还是用回调解决，将上面代码改写：
```js
var func2= function(param, callback) {
    http.request("/url", function(res) {
        obj.get(res, function(res2) {
            obj.get(res2,function(res3) {
                callback(res3);
            });
        });
        console.log('结束');
    });
}

接下来就是调用上面这段代码：
router.get("url", function(req, res) {
    func2(p1, function(res2) {
        res.render("html", {res:res2});
    });
});
```
```js


async function insertData(person){
    let db, collection, result; 
    try{
        db = await mongoDb.open();
        collection = await db.collection("users");
        result = await collection.insert(person);
    }catch(e){
        console.error(e.message);
    }
    console.log(result);
} 

function findOne(dbName, collectionName, whereStr) { 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(collectionName).find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            db.close();
        });
    });
}

// function findOne(dbName, collectionName, whereStr) { 
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db(dbName);
//         dbo.collection(collectionName).find(whereStr).toArray(function(err, result) {
//             if (err) throw err;
//             db.close();
//         });
//     });}
//     return _result;
// }
```