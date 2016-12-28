'use strict';

var express = require('express');
var data = require('./data.json');
var styleFile = require('./style.json');
var articlesFile = require('./articles.json');

var app = express();

data.elements = getDataFromArticles();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/data', function(req, res) {
   res.send({elements: data.elements, style: styleFile.style}); 
});

app.listen(process.env.PORT || 8080, function() {
    console.log('Server running');
});

function getDataFromArticles() {
    var edges = [];
    var nodes = data.elements;
    var unit = 1;
    var low = 0;
    var high = 10;
    
    articlesFile.articles.forEach(function(article) {
        for (var omic1 in article) {
            
            if (article[omic1] == 1) {
                for (var omic2 in article) {
                    
                    var id1 = omic1.charAt(0);
                    var id2 = omic2.charAt(0);
                    if (article[omic2] == 1 && id1 < id2) {
                        edges.push({
                			"data": {
                				"source": id1,
                				"target": id2,
                				"weight": 0.1,
                				"group": Math.floor(Math.random() * (high - low + 1) + low).toString()
                			},
                			"position": {},
                			"group": "edges"
                		});
                		nodes[id1].data.score += unit;
                		nodes[id2].data.score += unit;
                    }
                }
            }
        }
    });
    
    return nodes.concat(edges);
}