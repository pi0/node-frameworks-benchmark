var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(3501, function () {
  console.log('Express listening on port 3501')
});


