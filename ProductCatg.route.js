const express=require('express');
const productcatgRoute=express.Router();
let ProductCatg=require('./ProductCatg.model');

//Save Product Code
productcatgRoute.route('/addproductcatg/:pcatgid/:pcatgname').post(function (req,res){
    var productcatg=new ProductCatg({
        pcatgid:req.params.pcatgid,
        pcatgname:req.params.pcatgname
    });
    productcatg.save().then(productcatg=>{
        res.status(200).json({'product category':'product category added successfully'+productcatg});
        res.end();
    }).catch((err)=>{
        res.status(400).send("Unable tosave to database");
        res.end();
    });
    
});

//show all product category
productcatgRoute.route('/showproductcatg').get(function(req,res){
    ProductCatg.find().then(productcatg=>{
        res.send(productcatg);
        res.end();
    }).catch((err)=>{
        res.status(400).send("Data not found something went wrong");
        res.end();
    });
});
module.exports=productcatgRoute;