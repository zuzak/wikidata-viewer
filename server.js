var express = require('express')
var request = require('request')
var commons = require('wmcommons')
var app = express()

app.get('/', function(req, res){
  res.sendfile('index.html')
})

app.get('/data/:entity', function(req, res){
  var api = 'http://www.wikidata.org/w/api.php?&action=wbgetentities'
  api += '&sites=enwiki&languages=en&format=json&titles='
  request.get(api + req.params.entity, function(e, r, b) {
    var data = JSON.parse(b)
    if(data.success){
      data = data.entities
      var matches = Object.keys(data)
      data = data[matches[0]]
      res.json(data)
    } else {
      res.json('500',data)
    }
  })
})
app.get('/img/:entity', function(req, res){
  var img = decodeURI(req.params.entity)
  console.log(img+".")
  res.redirect(301,commons(img))
})

app.listen(3000)
