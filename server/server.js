var fs = require('fs');
var util = require("util");
var static = require('node-static');

var http = require("http").createServer(handleFunction);
http.listen(8000);

var fileServer = new static.Server('../');

var masterClient = null;

function handleFunction(request, response) {
  
  if(request.url === "/") {
    response.writeHead(302, {location: "/server/index.html"});
    response.end();
  }
  
  else if(request.url == "/master") {
    setUpResponseForSSE(response);
     masterClient = response;
  }
  
  else if(request.url == "/events") {
    setUpResponseForSSE(response);
    
    if(masterClient != null) {
      masterClient.write('event:newClient' + '\n' +
                          'data:' + request.headers['user-agent'] + '\n\n'); 
    }
    
    else {
      response.end();
    }
    
    var buildTests = "../component/testrunner/build/script/tests.js"
    var sourceTests = "../component/testrunner/source/script/tests-source.js"
    
    fs.watchFile(buildTests, function (curr, prev) {
    
      fs.readFile(buildTests, function (err, data) {
        if (err) throw err;
      
        var sseData = String(data).replace(/(\r\n|\n|\r)/gm, "\ndata:");
    
        //console.log(fileName, "changed");
    
        var responseText = [
            'event:' + 'autCode',
            'data:' + sseData
          ].join("\n") + "\n\n";
    
        response.write(responseText);
        console.log(sseData);
      });
    });
    
    fs.watchFile(sourceTests, function(curr, prev) {
      var responseText = [
          'event:' + 'autUri',
          'data:' + "html/tests-source.html"
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

function setUpResponseForSSE (response) {
  response.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    //neccessary for IE
    "Access-Control-Allow-Origin": "*"
  });
    
  //2kb padding for IE
  response.write(':' + Array(2049).join(' ') + '\n');
  
  /**
   * sending a periodic comment for keeping connection alive
   * is recommended especially for IE 
   */
  setInterval(function () {
    response.write(':\n');
  } , 15000);
  
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