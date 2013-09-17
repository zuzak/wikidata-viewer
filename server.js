var express = require('express')
var request = require('request')
var commons = require('wmcommons')
var app = express()

request = request.defaults({headers: {'User-Agent':'github.com/zuzak/wikidata-viewer'}})

app.get('/', function(req, res){
  res.sendfile('index.html')
})

app.get('/data/:entity', function(req, res){
  var api = 'http://www.wikidata.org/w/api.php?action=wbgetentities'
  api += '&sites=enwiki&languages=en&format=json&titles='
  request.get(api + req.params.entity, function(e, r, b) {
    var data = JSON.parse(b)
    if(data.success){
      data = data.entities
      var matches = Object.keys(data)
      if(matches[0] == "-1"){
        res.json(404,data)
        console.log("NONE " + req.params.entity)
        return
      } 
      data = data[matches[0]]
      res.json(data)
      console.log("GOOD " + req.params.entity)
    } else {
      res.json('500',data)
      console.log("FAIL "+ req.params.entity)
    }
  })
})
app.get('/img/:entity', function(req, res){
  var img = decodeURI(req.params.entity)
  res.redirect(301,commons(img))
})

// https://www.wikidata.org/wiki/Q4115189
//
/// http://www.wikidata.org/w/api.php?action=wbsetlabel&id=Q4115189&language=en&description=test&format=jsonfm
app.get('/write/:id/:description', function(req, res){
  if(req.params.id !== 'Q4115189'){
    res.json(403,{error:'not sandbox!'})
    return
  }
  request.get('https://www.wikidata.org/w/api.php?action=tokens&type=edit&format=json', function (e, r, b){
    var data = JSON.parse(b)
    var token = data.tokens.edittoken
    request({
      uri: 'http://www.wikidata.org/w/api.php',
      method: 'POST',
      form: {
        id: req.params.id,
        value: req.params.description,
        language: 'en',
        format: 'json',
        action: 'wbsetdescription',
        token: token
      }
    }, function(e, r, b) {
      var data = JSON.parse(b)
      res.json(data)
    })
  })
})

app.listen(3000)
