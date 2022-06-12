const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const cuisineSchema=new Schema({
    cuisineId:{
        type:String,
        required:true,
        unique:true
    },
    cuisineName:{
        type:String,
        required:true,
        unique:true
    }
});

const Cuisines=mongoose.model("cuisines",cuisineSchema);

module.exports=Cuisines;