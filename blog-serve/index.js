var express = require('express'),
  path = require('path'),
  fs = require('fs'),
url = require('url'),
scanModel = require('./models/scan'),
compression = require('compression');
var app = express();

app.use(compression());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

var multer = require('multer');
var sillyDatetime = require('silly-datetime');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, sillyDatetime.format(new Date(), 'YYYYMMDDHHmmss') + Math.floor(Math.random() * 10000) + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: storage
});

app.get('/stat', function (req, res) {
  scanModel.getScans().then(data => res.render('stat', {
    data: data
  }));
})

app.post('/images', upload.array('files', 5), function (req, res) {
  console.log(req.files)
  let files = req.files;
  if(files && files.length>0) {
      let data = files.map((f) => path.join(f.destination.replace('public',''),f.filename).slice(1));
      res.json(data)
  } else {
      res.send(null);
  }
  
})

app.use(function (req, res, next) {

  let ipRaw = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  if (ipRaw) {
    let idx = ipRaw.lastIndexOf(':') + 1
    let ip = ipRaw.substr(idx);
    scanModel.getScanBySite(ip).then((res) => {
      if (res) {
        scanModel.incCount(ip);
      } else {
        scanModel.create(ip);
      }
    })
  }
  fs.readFile(path.join(__dirname, 'public/index.html'), function (err, data) {
    res.end(data);
  })
})

app.use(function (err, req, res, next) {
  fs.readFile(path.join(__dirname, 'views/404.html'), function (err, data) {
    res.end(data);
  })
})

app.listen(80, function () {
  console.log('80')
})
