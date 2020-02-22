'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
const bodyParser = require("body-parser"); 
var cors = require('cors');
const urlHandler = require("./urlHandler.js");

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: 'false'}));
// app.use(bodyParser.json());

app.use(cors());

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); 


/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});
  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// ... what to do when the user submits/POSTs (our submit button is set to POST) a new long-form URL...
app.post("/api/shorturl/new", urlHandler.postLongUrl);

// ... and what to do when a short-url is targeted...
app.get("/api/shorturl/:short_url", urlHandler.getShortUrl);

// ... before finally defining what to do when the targeted endpoint is invalid:
app.use(function(req, res) {
  res.status(404)
    .sendFile(__dirname + "/views/404.html");
});




var listener = app.listen(process.env.PORT || 3000 , function () {
  console.log('Your app is listening on port ' + listener.address().port);
});