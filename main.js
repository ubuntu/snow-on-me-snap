#!/usr/bin/env node

const http = require('http'),
      path = require("path"),
      fs = require("fs");

// Let's define a port we want to listen on
const DEFAULT_PORT = 80;
var port = DEFAULT_PORT;

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
var CONFIG_DIR = process.env.SNAP_DATA;
if (!CONFIG_DIR) {
    CONFIG_DIR = '.'
}
const CONFIG_FILE = path.join(CONFIG_DIR, 'config');

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



fs.watchFile(CONFIG_FILE, (filename, prev) => {
    // file doesn't exist (even on startup) or exists and changed from default port
    loadconfig_and_start_server();
});
// if file exists on startup: load config and start server here
if (fs.existsSync(CONFIG_FILE)) {
    loadconfig_and_start_server();
}

function loadconfig_and_start_server() {
    fs.readFile(CONFIG_FILE, (err, data) => {
        if (err) {
            if (port != DEFAULT_PORT) {
                console.log("Error reading config file, reverting to defaut port:" + err);
            }
            port = DEFAULT_PORT
        } else {
            console.log("Load port configuration");
            // TODO
            port = 120
        }

        server.close(() => {
            server.listen(port, function(){
                console.log("Server listening on: http://localhost:%s", port);
            });
        });
    });
}
