const mongoose=require('mongoose');

const Schema=mongoose.Schema;
mongoose.pluralize(null);

const menuSchema=new Schema({
    menuId:{
        type:String,
        required:true,
        unique:true
    },
    name: {
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    cuisine: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    discountPrice: {
        type:Number
    }
});

const Menu=mongoose.model('menu',menuSchema);
module.exports=Menu;