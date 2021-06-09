// MONGOOSE SETUP
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/to_do_app_db');
const db=mongoose.connection;
db.on('err',console.error.bind(console,'error connecting to db'));
db.once('open',function()
{
    console.log('successfuly connected to mongodb');
});
module.exports=db;