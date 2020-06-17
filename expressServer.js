const express = require('express')
const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extends:false}));
 
app.get('/', function (req, res) {
    res.send('Hello World');
})
app.get('/test1', function (req, res) {
    res.render('test');
  })
app.get('/test2', function (req, res) {
   res.render('test2');
})

//브라우저는 무조건 get //같은 라우터 이름일때 구분은 get, post
app.get('/inputTest', function (req, res) {
    res.render('inputTest');
 })
 app.post('/inputTest', function (req, res) {
  console.log('reqeust!!');
  console.log(req.body.userIdBody);
  console.log(req.body.userPwBody);
  res.json(1);
})

app.listen(3000)