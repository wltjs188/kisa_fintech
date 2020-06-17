// var x = 5;
// var y= 6;
// var z = x + y;
// console.log(z);

// var length = 16; //number
// var lastName = "Johnson";
// var x = {firstName: "John", lastName:"Doe"};
// console.log(x);
// var x = 16 + " volvo";
// console.log(x);
// var b = 16 + 4 + "volvo";
// console.log(b);

// function myFunctionMulti(p1, p2){
//     return p1 * p2;
// }
// function myFunctionAdd(p1,p2){
//     return p1+p2;
// }
// function myFunctionSub(p1,p2){
//     return p1-p2;
// }
// function myFunctionDiv(p1,p2){
//     return p1/p2;
// }
// var x = myFunctionMulti(1,4);
// console.log(x);
// var y = myFunctionAdd(2,3);
// console.log(y);
// var z = myFunctionSub(4,1);
// console.log(z);
// var l = myFunctionDiv(4,2);
// console.log(l);

// var car = {
//     name : "sonata",
//     ph : "500ph",
//     start : function(){
//         console.log("engine is starting");
//     },
//     stop : function(){
//         console.log("engine is stoped");
//     }
// }

// console.log("car name : ",car.name);
// car.name = "sorento";
// console.log(car.name);
// car.start();

// var car1 = "saab";
// var car2 = "volvo";
// var car3 = "bmw";

// var cars = ["saab","volvo", "bmw"]; //배열
// console.log(cars);
// console.log(cars[0]);
// console.log(cars[1]);
// console.log(cars[2]);
// cars.push("add1");
// console.log(cars);
// console.log(cars[3]);

// var cars = [];
// var car1 = {
//     name : "volvo",
//     ph : "500ph",
//     start : function(){
//         console.log("starting");
//     },
//     stop : function(){
//         console.log("stopped");
//     }
// }
// var car2 = {
//     name : "sonata",
//     ph : "200ph",
//     start : function(){
//         console.log("starting");
//     },
//     stop : function(){
//         console.log("stopped");
//     }
// }
// var car3 = {
//     name : "bmw",
//     ph : "7000ph",
//     start : function(){
//         console.log("starting");
//     },
//     stop : function(){
//         console.log("stopped");
//     }
// }
// cars.push(car1);
// cars[1]=car2;
// cars[2] = car3;

// for(var i=0;i<cars.length;i++){
//     if(cars[i].name == "bmw"){
//         console.log("find", cars[i].name);
        
//     }
// }

// function aFunc() {
//     setTimeout(function () {
//         console.log('a');
//     },1700)
// }
// function bFunc() {
//     setTimeout(function () {
//         console.log('b');
//     },1000)
// }
// function cFunc() {
//     setTimeout(function () {
//         console.log('c');
//     },500)
// }
// aFunc();
// bFunc();
// cFunc();

var fs = require('fs');
function callReadFile(callback){
    fs.ReadFile('./test.txt','utf8',function(err,result){
        if(err){
            console.error(err);
            throw err;
        }
        else{
            callback(result);
        }
    });
}

console.log('first func');
console.error("두번째 기능인데");
callReadFile(function(data){
    console.log(data);
    console.log('third func');
    
})