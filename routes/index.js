var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var fs=require('fs');
//var splitFile = require('split-file');
var pdf2img = require('pdf2img'); 

// First you need to create a connection to the db
		var con = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "password",
		  database:"connection"
		});

/* GET home page. */

router.get('/', function(req, res, next) {
			  res.render('project1', { title: 'vijay' });
			});

router.get('/newblooddonor', function(req, res, next) {
			  res.render('newblooddonor', { title: 'vijay' });
			});

router.get('/SearchDonor', function(req, res, next) {
			  res.render('SearchDonor', { title: 'vijay' });
			});

router.post('/update/donor/info', function(req, res, next) {
	console.log(req.body);
	var detail=req.body;
	var names=detail.customer_name;
	var blood=detail.blood_group;
	var address=detail.customer_address;
	var insertQuery="insert into blood (name,blood,address) values ('"+names+"','"+blood+"','"+address+"') ";


		console.log(insertQuery);
		con.query(insertQuery,function(err,result){
		  if(err){ throw err;
				  res.send({
				  
				  data:"data not inserted"
				});
			}

			else{
					console.log('Data received from Db:\n');
			res.send({
				  
				  data:"data  inserted"
				});
			}


			});
			});

router.post('/show/donor/info', function(req, res, next) {
	console.log(req.body);
	var Search=req.body.search;

	var searchQuery="SELECT * from blood where blood = '"+ Search + "' ";


		console.log(searchQuery);
        con.query(searchQuery,function(err,result){
		  if(err){ throw err;
				  res.send({
				  flag:false,
				  data:"data not inserted"
				});
			}

			else{
					console.log('Data received from Db:\n');
			res.send({
				  flag:true,
				  data:result
				});
			}


			});
		
			});
router.post('/downloads', function(req, res) {
	console.log(req);
		
			res.send({				  
				  data:"data  received"
				});		
			});


router.post('/upload/UP', function( req, res ){
	});

module.exports = router;

