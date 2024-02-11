var mongoose=require('mongoose');
const Schema=mongoose.Schema;
var ProductCatg= new Schema({
    pcatgid:{type:Number},
    pcatgname:{type:String}
},
{
    collection:'ProductCatg'
}
);
module.exports=mongoose.model('ProductCatg',ProductCatg);