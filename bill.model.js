var mongoose=require('mongoose');
const Schema = mongoose.Schema;
var Bill = new Schema({
    bid:{type:Number},
    pid:{type:Number},
    pname:{type:String},
    oprice:{type:Number},
    ppicname:{type:String},
    CId:{type:Number},
    CustomerName:{type:String},
    billdate:{type:String}
},
{
    collection:'Bill'
}
);
module.exports=mongoose.model('Bill',Bill);