var express=require('express');
var app=express();
var cors =require('cors');
var bodyparser = require('body-parser');
const PORT=2024;
var mongoose=require('mongoose');
var db= require("./DB")
var productcatgRoute=require('./product/ProductCatg.route');
var productRoute = require('./product/product.route');
var venderRoute=require('./vender/Vender.route');
var stateRoute=require('./statecity/state.route');
var cityRoute=require('./statecity/city.route');
var customerRoute=require('./customers/customers.route');
var paymentRoute=require('./payment'); 
var billRoute=require('./bill/bill.route');
// skip 10 lines

app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));
app.use("/productcatg",productcatgRoute);
app.use("/product",productRoute);
app.use("/vender",venderRoute);
app.use("/state",stateRoute);
app.use("/city",cityRoute);
app.use("/customers",customerRoute);
app.use("/payment",paymentRoute);
app.use("/bill",billRoute);

 
// skip 20 lines.....

mongoose.Promise=global.Promise;
mongoose.connect(db.URL,{useNewUrlParser:true}).then(()=>
{
    console.log('database is connected '+db.URL)
},
err=>{console.log('can not connected to the data base '+err)}
);

app.listen(PORT,()=>{
    console.log("server is running on port "+PORT);
});