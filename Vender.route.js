const express=require("express");
const venderRoute=express.Router();
const Vender=require("./Vender.model");
const fs=require("fs");
const multer=require("multer");

//vender registration code
venderRoute.route("/register").post((req,res)=>{
    var vender=new Vender(req.body);
    vender.save().then(vender=>{
        if(vender!=null)
        {
            res.send("Registration Succesfully");
        }
        else
        {
            res.send("Registration Failed");
        }
    }).catch((err)=>{
        res.status(400).send("Registration Failed")
    });
});

//vender login code
venderRoute.route("/login/:vuid/:vupass").get((req,res)=>{
    var id=req.params.vuid;
    var pass=req.params.vupass;

    Vender.findOne({$and:[{"VUserId":id},{"VUserPass":pass}]}).then(vender=>{
        res.send(vender);
        res.end();
    }).catch((err)=>{
        res.send("something went wrong");
        res.send();
    });
});

//get image
venderRoute.route('/getvenderimage/:vpicname').get((req,res)=>{
    res.sendFile("F:/UNIVERSAL/MERN 10-oct/10 PROJECT/backend/server-app/venderimages/"+req.params.vpicname);
});

//image save
const st=multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'venderimages/')
    },
    filename:(req, file, cb) => {
        cb(null,file.originalname)
    },
})
const upload=multer({storage:st});

venderRoute.post('/savevenderimage',upload.single('file'),(req,res)=>{
    res.json({})
});

//get vender for count
venderRoute.route("/getvendercount").get((req,res)=>{
    Vender.find().then(vender=>{
        res.send(vender);
        res.end();
    }).catch((err)=>{
        res.send("something went wrong");
        res.end();
    });
});

module.exports=venderRoute;