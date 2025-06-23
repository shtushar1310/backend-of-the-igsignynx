const  mongoose = require('mongoose');

const ApplySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    resume:{
        type:String,
        required:true
    }
});

const Apply=mongoose.model('Apply',ApplySchema);
module.exports=Apply;

