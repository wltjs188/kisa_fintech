const express = require('express')
const app = express()
const path = require('path');
const request = require('request');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extends:false}));

app.use(express.static(path.join(__dirname,'public'))); //bootstrap

app.get('/design', function (req, res) {
    res.render('wallet');
})

app.get('/signup', function(req,res){
    res.render('signup');
})
app.get('/authResult',function(req,res){
    console.log('authResult');
    console.log(req.query);
    var authCode = req.query.code;
    var option={
        method : "POST",
        url : "https://testapi.openbanking.or.kr/oauth/2.0/token",
        header : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        form : {
            code : authCode,
            client_id:'w8lMFnJ9cvTfdKRB3yO200bgVGtxumpmC0pMb20S',
            client_secret:'aTI6I3I0xaycaPxZBtGdxa7l24pVnkBdyjU7VWge',
            redirect_uri: 'http://localhost:3000/authResult',
            grant_type:'authorization_code',
        }
    }
    request(option, function (error, response, body) {
        console.log(body);
        res.json(body);
    });
})

app.listen(3000)