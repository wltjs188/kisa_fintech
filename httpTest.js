var http = require("http");

http.createServer(function(req,res){
    var body = "hello Server";
    res.setHeader('content-Type','text/html; charset=utf-8');
    res.end("<h1>안녕하세요<h2><hr>");

}).listen(3000);
console.log('server is started');