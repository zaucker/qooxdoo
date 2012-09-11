var fs = require('fs');
var util = require("util");
var static = require('node-static');

var http = require("http").createServer(handleFunction);
http.listen(8888);

var fileServer = new static.Server('../');

function handleFunction(request, response) {
  
  if(request.url === "/") {
    response.writeHead(302, {location: "/server/index.html"});
    response.end();
  }
  
  else if(request.url == "/events") {
    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      //neccessary for IE
      "Access-Control-Allow-Origin": "*"
    });
    
    //2kb padding for IE
    response.write(':' + Array(2049).join(' ') + '\n');
    
    var fileName = "tests.js"
    fs.watchFile(fileName, function (curr, prev) {
      var eventType = 'testsuitechange';
    
      //console.log(fileName, "changed");
    
      var responseText = [
          'event:' + eventType,
          'data:' + fileName
        ].join("\n") + "\n\n";
    
      response.write(responseText);
    });

  }
  else {
    request.addListener('end', function () {
      fileServer.serve(request, response, function (err, result) {
        if (err) { // There was an error serving the file
          util.error("Error serving " + request.url + " - " + err.message);
    
          // Respond to the client
          response.writeHead(err.status, err.headers);
          response.end();
        }
      });
    });
  }
}

// var io = require('socket.io').listen(http);
// 
// io.sockets.on('connection', function (socket) {
// 
//   var fileName = "component/testrunner/source/script/tests-source.js";
// 
//   fs.watchFile(fileName, function (curr, prev) {
//     
//     fs.readFile(fileName, function (err, data) {
//       if (err) throw err;
//       //console.log(data);
//       socket.emit('testsuitechange', data.toString());
//     });
//   });
//   
//   socket.on('callback', function(data) {
//     console.log("What came back: " + data.toString());
//   });
// });