var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Customers=new Schema({
    CUserId:{type:String},
    CUserPass:{type:String},
    CustomerName:{type:String},
    StId:{type:Number},
    CtId:{type:Number},
    CAddress:{type:String},
    CContact:{type:Number},
    CEmail:{type:String},
    CPicName:{type:String},
    CId:{type:Number}
},
{
    collection:"Customers"
});
module.exports=mongoose.model("Customers",Customers);