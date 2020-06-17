const request = require('request');
var parseString = require('xml2js').parseString;
request('', function (error, response, body) {
    var data = JSON.parse(body);
    console.log(data);
});

