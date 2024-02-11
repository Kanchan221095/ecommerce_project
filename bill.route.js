const express=require('express');
const billRoute=express.Router();
let Bill=require('./bill.model');
const multer = require('multer');

//Save Product
billRoute.route('/savebill').post((req,res)=>{
    let bill=new Bill(req.body);
    bill.save().then(bill=>{
        res.status(200).json({'bill':'bill product added successfully'+bill});
    }).catch(err=>{
        res.status(400).send("Unable to save Database");
    });
},[]);

//get all product
billRoute.route('/showbill/:cid').get(function (req,res){
    Bill.find({"CId":req.params.cid}).then(bill=>{
        console.log(bill);
        res.send(bill);
    }).catch((err)=>{
        res.status(400).send('data not found something went wrong');
    });
},[]);

//get product count for id
billRoute.route('/getmaxbid').get(function(req,res){
    Bill.find().then(bill=>{
        console.log(bill);
        res.send(bill);
    }).catch((err)=>{
        res.status(400).send("Data not found something went wrong");
    });
});


//get product image
billRoute.route('/getproductimage/:picname').get((req,res)=>{
    res.sendFile("F:/UNIVERSAL/MERN 10-oct/10 PROJECT\backend/server-app/productimage/"+req.params.picname);
});
module.exports=billRoute;