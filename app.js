var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var routes = require('./routes/index');
var users = require('./routes/users');
var gm = require('gm');
var img2pdf = require("pdf-image-pack");

var app = express();
var fs=require('fs');
var pdf2img = require('pdf2img'); 


app.use(fileUpload());
app.get('/', function(req, res, next) {
			  res.render('project', { title: 'vijay' });
			});


app.post('/upload', function(req, res) {
   var sampleFile;
  console.log("upload");
   if (!req.files) {
       res.send('No files were uploaded.');
       return;
   }
   sampleFile = req.files.sampleFile;

console.log(req.files.sampleFile.mv);
var fileName=sampleFile.name;

   sampleFile.mv('./public/images/'+fileName); 

var input = './public/images/'+fileName;
 
pdf2img.setOptions({
  type: 'png',                      // png or jpeg, default png 
  size: 1024,                       // default 1024 
  density: 600,                     // default 600 
  outputdir: './public/sample', // mandatory, outputdir must be absolute path 
  targetname: 'test'                // the prefix for the generated files, optional 
});

pdf2img.convert(input, function(err, info) {
  if (err) console.log(err)
  else{

console.log(info);

res.render('imagesShow',{data: info});
	
}

});


 });

app.post('/download', function(req, res) {
var imgs = JSON.parse(req.body.val);
console.log(imgs);
var arr = [];
for ( var i = 0; i< imgs.length; i++)
{
	arr.push(imgs[i]);
}
console.log(arr);
var output = "./public/sample/out.pdf";
var slide = new img2pdf();
slide.output(arr, output, function(err, doc){
 console.log("finish output");
	});
res.send(output.substring(8));
});



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js',express.static(path.join(__dirname, 'public/javascripts')));

app.use('/', routes);
app.use('/users', users);


module.exports = app;
