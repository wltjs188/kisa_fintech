var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '125400',
  database : 'fintech'
});
 
connection.connect();
 
connection.query('SELECT * FROM fintech.user;', function (error, results, fields) {
  if (error) throw error;
  console.log('모든 회원 정보: ', results);
});
 
connection.end();