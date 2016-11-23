#!/usr/bin/env node

const http = require('http'),
      path = require("path"),
      fs = require("fs");

// Let's define a port we want to listen on
const PORT = 80;

const html = `
<header>
  <title>Merry christmas!</title>
  <style>
    body {
        background-image: url("snow.gif");
        background-repeat: repeat;
    }
  </style>
</header>
`;

const rootdir = path.resolve(__dirname);

function handleRequest(request, response){
    if (request.url === "/snow.gif") {
        fs.readFile(path.join(rootdir, 'snow.gif'), 'binary', function(err, file) {
            if (err) {
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write("404 Not Found\n");
                response.end();
                return;
            }
            response.writeHeader(200, {"Content-Type": "image/gif"});
            response.write(file, "binary");
            response.end();
        });
        return;
    }
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.end(html);
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
