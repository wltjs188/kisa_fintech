const express = require('express')
const app = express()
const path = require('path');
const request = require('request');
const jwt = require('jsonwebtoken');
const auth = require('./lib/auth');
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
})

//로그인 JWT vs session
app.get('/login',function(req,res){
    res.render('login');
})
app.post('/login',function(req,res){
    console.log(req.body.userEmail, req.body.userPassword);
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;

    var sql ="SELECT * FROM fintech.user WHERE email =  ?"; //email 확인

    connection.query(sql,[userEmail], function (error, results, fields) {
        if (error) throw error;
        if(results.length == 0){
            res.json('사용자가 없습니다.');
        }
        else{
            var dbPassword = results[0].password;
            console.log(dbPassword);
            if(dbPassword == userPassword){
                console.log('login 성공!');
                //JWT 발급
                jwt.sign(
                    { //fayload
                        userId : results[0].id,
                        userName : results[0].name
                    },
                    'fintechService!1234#', 
                    { 
                        expiresIn : '10d',
                        issuer : 'fintech.admin',
                        subject : 'user.login.info'
                    }, 
                    function(err, token) {
                        res.json(token);
                    }  
                );
            }
            else if(dbPassword != userPassword){
                res.json('패스워드가 다릅니다.');
            }
        }
      });
})

app.get('/main', function(req, res){
    res.render('main');
})

app.post('/list',auth,function(req,res){
    // console.log("확인"+req.decoded);
    var userId = req.decoded.userId;
    var sql = "SELECT * FROM user WHERE id = ?"
    connection.query(sql,[userId], function (error, results, fields) {
        if (error) throw error;
        var accesstoken = results[0].accesstoken;
        var userseqno = results[0].userseqno;
        console.log(accesstoken,userseqno);

        var option={
            method : "GET",
            url : "https://testapi.openbanking.or.kr/v2.0/user/me",
            headers : {
                'Authorization' : 'Bearer '+accesstoken
            },
            qs : {
                user_seq_no : userseqno
            }
        }
        request(option, function (error, response, body) {
            console.log(body);
            var requestResultJSON = JSON.parse(body);
            res.json(requestResultJSON);
        });

      });
})

app.get('/balance', function(req, res){
    res.render('balance');
})

app.post('/balance',auth,function(req,res){
    
    var countnum = Math.floor(Math.random() * 1000000000) + 1;
    var transId = "T991637180U" + countnum; //이용기과번호 본인것 입력
    var finusenum = req.body.fin_use_num;
    var userId = req.decoded.userId;
    
    //databse 조회
    var sql = "SELECT * FROM user WHERE id = ?"
    connection.query(sql,[userId], function (error, results, fields) {
        if (error) throw error;
        var accesstoken = results[0].accesstoken;
        console.log(accesstoken);

        // => 잔액조회 request 요청
        var option={
            method : "GET",
            url : "https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num",
            headers : {
                'Authorization' : 'Bearer '+accesstoken
            },
            qs : {
                bank_tran_id : transId,
                fintech_use_num : finusenum,
                tran_dtime : '20200618060606',
            }
        }
        request(option, function (error, response, body) {
            console.log(body);
            var requestResultJSON = JSON.parse(body);
            res.json(requestResultJSON);
        });

      });

    
})

//거래내역조회
app.post('/transactionlist',auth,function(req,res){
    
    var finusenum=req.body.fin_use_num;
    
    var countnum = Math.floor(Math.random() * 1000000000) + 1;
    var transId="T991637180U"+countnum;
    
    //db조회
    //=> 거래내역조회 request 요청 코딩 (완료)
    var userId = req.decoded.userId;//decoded사용은 auth추가 필요
    var sql = "SELECT * FROM user WHERE id = ?";
    
    connection.query(sql,[userId], function(err, result){
        if(err) throw err;
    var accesstoken = result[0].accesstoken;
    var userseqno = result[0].userseqno;
  
    var option = {
        method : "GET",
        url : "https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num",
        headers : {
            'Authorization' : 'Bearer ' + accesstoken
        },
        qs : {
            bank_tran_id:transId,
            fintech_use_num:finusenum,
            inquiry_type:'A',
            inquiry_base:'D',
            from_date: "20200404",
            to_date:"20200405",
            sort_order:"D",
            tran_dtime:'20200618095001'
        }
    }
    request(option, function (error, response, body) {
        //console.log(body);
        var requestResultJSON = JSON.parse(body);
        res.json(requestResultJSON)
    });
})
})

app.get('/qrcode',function(req,res){
    res.render('qrcode');
})
app.get('/qr',function(req,res){
    res.render('qrReader');
})

app.post('/withdraw',auth, function (req, res) {
    var userId = req.decoded.userId;
    var fin_use_num = req.body.fin_use_num;
    var countnum = Math.floor(Math.random() * 1000000000) + 1;
    var transId = "T991637180U" + countnum; //이용기과번호 본인것 입력

    var sql = "SELECT * FROM user WHERE id = ?"
    connection.query(sql,[userId], function(err , result){
        if(err){
            console.error(err);
            throw err
        }
        else {
            console.log(result);
            var option = {
                method : "POST",
                url : "https://testapi.openbanking.or.kr/v2.0/transfer/withdraw/fin_num",
                headers : {
                    Authorization : 'Bearer ' + result[0].accesstoken,
                    "Content-Type" : "application/json"
                },
                json : {
                    "bank_tran_id": transId,
                    "cntr_account_type": "N",
                    "cntr_account_num": "9118907638",
                    "dps_print_content": "쇼핑몰환불",
                    "fintech_use_num": "199163718057884770357489",
                    "wd_print_content": "오픈뱅킹출금",
                    "tran_amt": "1000",
                    "tran_dtime": "20200424131111",
                    "req_client_name": "홍길동",
                    "req_client_fintech_use_num" : "199163718057884770357489",
                    "req_client_num": "HONGGILDONG1234",
                    "transfer_purpose": "TR",
                    "recv_client_name": "김지선",
                    "recv_client_bank_code": "097",
                    "recv_client_account_num": "9118907638"
                }
            }
            request(option, function(err, response, body){
                if(err){
                    console.error(err);
                    throw err;
                }
                else {
                    console.log(body);
                    if(body.rsp_code == 'A0000'){
                        res.json(1)
                    }
                }
            })
        }
    })
})

app.listen(3000)