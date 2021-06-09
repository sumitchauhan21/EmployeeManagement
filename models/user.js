// USER SCHEMA
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email:{                         //emai,password,name are the attributes/fields of table.
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address1:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
    
},
{
    timestamps:true             //maintain created time and updated time.
});
const User = mongoose.model('User',userSchema);
module.exports = User; 
