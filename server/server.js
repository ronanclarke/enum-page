var express = require("express");
var path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/../views/index.html'));
});


var port = 3000;
app.listen(port);
console.log("Listening on ",port, '...')


