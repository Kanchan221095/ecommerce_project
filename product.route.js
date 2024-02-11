const express=require('express');
const productRoute=express.Router();
let Product=require('./product.model');
const multer = require('multer');

//Save Product
productRoute.route("/saveproduct").post((req,res)=>{
    var product=new Product(req.body);
    product.save().then(product=>{
        res.status(200).json({'product':'product added successfully'+product});
    }).catch(err=>{
        res.status(400).send("Unable to save Database");
    });
},[]);

//get Product Count
productRoute.route('/getmaxpid').get(function(req,res){
    Product.find().then(product=>{
        console.log(product);
        res.send(product);
    }).catch(err=>{
        res.status(400).send("Data not found something went wrong");
    });
},[]);

//Get Product all
productRoute.route('/showproduct').get(function(req,res){
    Product.find().then(product=>{
        console.log(product);
        res.send(product);
    }).catch(err=>{
        res.status(400).send("Data not found something went wrong");
    });
},[]);

//save Product Image
const stv=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'productimage/')
    },
    filename:(req, file,cb)=>{
        cb(null, file.originalname);
    },
});

const uploadv=multer({storage:stv});
productRoute.post('/saveproductimage',uploadv.single('file'),(req,res)=>{
    res.json({})
});


//get Product image
productRoute.route('/getproductimage/:ppicname').get((req,res)=>{
    res.sendFile("F:/UNIVERSAL/MERN 10-oct/10 PROJECT/backend/server-app/productimage/"+req.params.ppicname);
});

module.exports=productRoute;