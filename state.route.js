const express=require('express');
const stateRoute=express.Router();
let State=require('./state.model');

//Save State
stateRoute.route('/addstate/:stid/:stname').post(function (req,res){
    var state=new State({
        stid:req.params.stid,
        stname:req.params.stname
    })
    state.save().then(state=>{
        res.status(200).json({'state':'state added successfully'+state});
        res.end();
    }).catch((err)=>{
        res.status(400).send("Unable to save to Database");
        res.end();
    });
});

//Show All State
stateRoute.route('/showstate').get(function(req,res){
    State.find().then(state=>{
        res.send(state);
        res.end();
    }).catch((err)=>{
        res.status(400).send("Data not found something went wrong");
    });
});
module.exports=stateRoute;