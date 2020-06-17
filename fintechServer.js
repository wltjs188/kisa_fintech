const express = require('express')
const app = express()
const path = require('path');
const request = require('request');
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '125400',
  database : 'fintech'
});
 
connection.connect();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extends:false}));

app.use(express.static(path.join(__dirname,'public'))); //bootstrap

app.get('/design', function (req, res) {
    res.render('wallet');
})



//인증받기
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
        var requestResultJSON = JSON.parse(body);
        console.log(requestResultJSON);
        res.render('resultChild',{data : requestResultJSON});
    });
})

//가입하기
app.get('/signup', function(req,res){
    res.render('signup');
})
app.post('/signup', function(req, res){
    var userName = req.body.userName;
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var userAccessToken = req.body.userAccessToken;
    var userRefreshToken = req.body.userRefreshToken;
    var userSeqNo = req.body.userSeqNo;
    console.log(userAccessToken, userRefreshToken, userSeqNo);
    var sql ="INSERT INTO fintech.user (name, email, password, accesstoken, refreshtoken, userseqno) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(sql,[userName,userEmail,userPassword,userAccessToken,userRefreshToken,userSeqNo], function (error, results, fields) {
        if (error) throw error;
        res.json("가입완료");
      });
       
      connection.end();

})

//로그인
app.get('/login',function(req,res){
    res.render('login');
})
app.post('/login',function(req,res){
    console.log(req.body.userEmail, req.body.userPassword);
})
app.listen(3000)