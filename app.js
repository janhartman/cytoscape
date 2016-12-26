'use strict';

var express = require('express');
var data = require('./data.json');
var styleFile = require('./style.json');
var articlesFile = require('./articles.json');

var app = express();

data.elements = data.elements.concat(getGraphEdgesFromArticles());

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

function getGraphEdgesFromArticles() {
    var edges = [];
    
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
                				"weight": 0.1
                			},
                			"position": {},
                			"group": "edges"
                		});
                    }
                }
            }
        }
    });
    
    return edges;
}