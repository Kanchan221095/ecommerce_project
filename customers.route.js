const express=require("express");
const customerRoute=express.Router();
const Customer=require("./customers.model")
var fs=require("fs");
const multer=require('multer');

//Customer Registration Code
customerRoute.route("/register").post((req,res)=>{
    var customer=new Customer(req.body);
    customer.save().then(customer=>{
        if(customer!=null)
        {
            res.send("Registration Successfully");
        }
        else
        {
            res.send("Registration Failed");
        }
    }).catch((err)=>{
        res.status(400).send("Registration Failed");
    });
});

//Customer Login Code
customerRoute.route("/login/:cuid/:cupass").get((req,res)=>{
    var id=req.params.cuid;
    var pass=req.params.cupass;
    Customer.findOne({$and:[{"CUserId":id},{"CUserPass":pass}]}).then(customer=>{
        res.send(customer);
        res.end();
    }).catch((err)=>{
        res.send("something went wrong");
        res.end();
    });
});

//get image
customerRoute.route('/getcustomersimage/:cpicname').get((req,res)=>{
    res.sendFile("F:/UNIVERSAL/MERN 10-oct/10 PROJECT/backend/server-app/customerimages/"+req.params.cpicname);
});

//save image
const cst=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'customerimages/')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    },
});
const cupload = multer({storage: cst});
customerRoute.post('/savecustomerimage',cupload.single('file'),(req,res)=>{
    res.json({})
});

//get customer for count
customerRoute.route("/getcustomercount").get((req,res)=>{
    Customer.find().then(customer=>{
        res.send(customer);
        res.end();
    }).catch((err)=>{
        res.send("something went wrong");
        res.end();
    });
});

//get customer details
customerRoute.route("/getcustomerdetails/:cid").get((req,res)=>{
    var id=req.params.cid;
    Customer.findOne({"CId":id}).then(customer=>{
        res.send(customer);
        res.end();
    }).catch((err)=>{
        res.send("something went wrong");
        res.end();
    });
});

module.exports=customerRoute;