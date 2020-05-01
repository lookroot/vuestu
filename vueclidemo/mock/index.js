const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const createError = require("http-errors");
const FILEPATH = './userlist.json';
const SEXFILEPATH = './sexlist.json';
let app = express();
// 解析表单数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// 解析formdata
let multipartMiddleware = multipart();
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
let result = {
    code: 200,
    data: null,
    msg: ""
}
// get
app.get('/get', function (req, res) {
    let data = fs.readFileSync(FILEPATH, "utf8");
    result.data = JSON.parse(data);
    result.msg = "";
    res.json(result);
    // res.sendStatus(400);
})
function saveData(req, res) {
    let data = fs.readFileSync(FILEPATH, "utf8");
    data = JSON.parse(data);
    req.body.timestamp = new Date().getTime();
    data.push(req.body)
    fs.writeFileSync(FILEPATH, JSON.stringify(data));
    result.msg = "添加成功";
    result.data = null;
    res.json(result);
}
function updateData(req, res) {
    let data = fs.readFileSync(FILEPATH, "utf8");
    data = JSON.parse(data);
    data = data.map(user => {
        if (user.name == req.body.name) {
            return req.body;
        }
        return user;
    })
    fs.writeFileSync(FILEPATH, JSON.stringify(data));
    result.msg = "更新成功";
    result.data = null;
    res.json(result);
}
function delData(req, res) {
    let data = fs.readFileSync(FILEPATH, "utf8");
    data = JSON.parse(data);
    data = data.filter(user => {
        return user.name != req.query.name;
    })
    fs.writeFileSync(FILEPATH, JSON.stringify(data));
    result.msg = "删除成功";
    result.data = null;
    res.json(result);
}
// post
app.post('/post', function (req, res) {
    saveData(req, res);
})
// 传统的 fromdata 传递数据
app.post('/postformdata', multipartMiddleware, function (req, res) {
    saveData(req, res);
});
// put
app.put('/put', function (req, res) {
    updateData(req, res);
})
// del
app.delete('/del', function (req, res) {
    delData(req, res);
})
app.get('/sexlist', function (req, res) {
    let data = fs.readFileSync(SEXFILEPATH, "utf8");
    result.data = JSON.parse(data);
    res.json(result);
})
app.listen(3000, function () {
    console.log('app is running');
})