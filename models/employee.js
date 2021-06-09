// EMPLOYEE SCHEMA
const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    fullname:{                        
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    dateofjoining:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    manager:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    employmentstatus:{
        type:String,
        required:true
    },
     user:{
        type:mongoose.Schema.Types.ObjectId,
         ref:'User'
     }
},
{
    timestamps:true             //maintain created time and updated time.
});
const Employee = mongoose.model('Employee',employeeSchema);
module.exports = Employee; 
