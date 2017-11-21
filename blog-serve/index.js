var express = require('express'),
path = require('path'),
fs = require('fs');
url = require('url');
scanModel = require('./models/scan');
var app = express();

app.use(express.static('public'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs')

app.get('/stat',function(req,res) {
    scanModel.getScans().then(data => res.render('stat',{data:data})); 
})

app.use(function(req,res){
    let ipRaw = req.headers['x-forwarded-for'] ||  
    req.connection.remoteAddress ||  
    req.socket.remoteAddress ||  
    req.connection.socket.remoteAddress;
    if(ipRaw) {
        let idx = ipRaw.lastIndexOf(':')+1
        let ip = ipRaw.substr(idx);
        scanModel.getScanBySite(ip).then((res) => {
            if(res) {
                scanModel.incCount(ip);
            } else {
                scanModel.create(ip);
            }
        })
    }
    fs.readFile(path.join(__dirname,'public/index.html'),function(err,data) {
        res.end(data);
    })
})

app.use(function(err,req,res,next) {
    fs.readFile(path.join(__dirname,'views/404.html'),function(err,data) {
        res.end(data);
    })
})

app.listen(80,function() {
    console.log('80')
})