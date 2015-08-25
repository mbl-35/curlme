#!/usr/bin/env node

var http = require('http');
var path = require('path');
var fs = require('fs');
var Busboy = require('busboy');
var port = 5000;

if (process.argv[2]) {
  port = process.argv[2];
} else if (process.env.CURLME_PORT) {
  port = process.env.CURLME_PORT;
}
port = parseInt(port, 10);

function serveFile(filepath, res) {
  console.log('serveFile', filepath);
  var filename = path.basename(filepath);
  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  var rs = fs.createReadStream(filepath);
  rs.on('error', function(err) {
    console.log('error', err);
    res.statusCode = 500;
    res.end(err + '');
  });
  rs.on('end', function() {
    fs.unlink(filepath, function(err) {
      console.log('unlink', filepath, 'error', err);
    });
  });
  rs.pipe(res);
}

function saveFile(filepath, req, res) {
  console.log('saveFile', filepath);
  var busboy = new Busboy({
    headers: req.headers
  });
  var ws = fs.createWriteStream(filepath);
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    file.on('data', function(data) {
      ws.write(data);
    });
    file.on('end', function() {
      ws.end();
    });
  });
  busboy.on('finish', function() {
    res.end();
  });
  req.pipe(busboy);
}

var server = http.createServer(function(req, res) {
  var filepath = './files' + req.url;
  if (req.method === 'POST') {
    saveFile(filepath, req, res);
  } else {
    serveFile(filepath, res);
  }
});

server.listen(port, function() {
  console.log('Listening on port ' + port);
});