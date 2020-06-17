const express = require('express')
const app = express()
const path = require('path');

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


app.listen(3000)