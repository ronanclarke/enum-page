var express = require("express");
var path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();

//app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));
//app.set('views', __dirname + '/server/views/');
//app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine','jade');

app.get("/partials/:partialPath",function(req,res){
  res.render('partials/' + req.params.partialPath);
});
app.get('*', function (req, res) {
  res.render("index");
});


var port = 3000;
app.listen(port);
console.log("Listening on ",port, '...')


