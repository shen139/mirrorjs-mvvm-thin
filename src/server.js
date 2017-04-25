global.__base_path = __dirname + "/";

let http = require("http");
let finalhandler = require("finalhandler");
let serveStatic = require("serve-static");
let mirrorjs = require("mirrorjs");
mirrorjs.widgets.controller.installAll();

let serve = serveStatic(global.__base_path + "../build/");
let server = http.createServer(function (req, res)
{
    let done = finalhandler(req, res);
    serve(req, res, done);
});

// mirrorjs server conf
let serverConf = mirrorjs.servers.readConf(__dirname + "/../conf/server.conf", true);


// global application params
const appParams = {
    chat: {
        usersMap: {}
    }
};

// Init SockJS
let owsAppServer = new mirrorjs.servers.SockJS(serverConf, appParams, server);

console.log("http://localhost:" + serverConf["port"] + "/");

server.listen(serverConf["port"]);


