'use strict';

var express = require('express');
var cy = require('cytoscape');

var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {

    res.render('index');
});

app.get('/data', function(req, res) {
    
    var data = require('./data.json');
    var style = require('./style.json');
   res.send({elements: data.elements, style: style.style}); 
});

app.listen(process.env.PORT || 8080, function() {
    console.log('Server running');
});