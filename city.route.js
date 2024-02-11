const express=require('express');
const cityRoute=express.Router();
let City=require('./city.model');
const { default: mongoose } = require('mongoose');

//Save City
cityRoute.route('/addcity/:ctid/:ctname/:stid').post(function (req,res){
    var city=new City({
        ctid:req.params.ctid,
        ctname:req.params.ctname,
        stid:req.params.stid
    });

    city.save().then(city=>{
        res.status(200).json({'city':'city added successfully'+city});
        res.end();
    }).catch((err)=>{
        res.status(400).send("Unable to Save to Database");
        res.end();
    });
});

//Show All City
cityRoute.route('/showcity').get(function(req,res){
    City.find().then(city=>{
        res.send(city);
        res.end();
    }).catch((err)=>{
        res.status(400).send("Data not found something went wrong");
    });
});

//Show City by State
cityRoute.route("/showcitybystate/:stid").get(function(req,res){
    City.find({"stid":req.params.stid}).then(city=>{
        res.send(city);
        res.end();
    }).catch((err)=>{
        res.status(400).send("Data not found something went wrong");
    });
});

module.exports=cityRoute;

