// MAIN INDEX FILE
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 801;
const db = require('./config/mongoose');    //use mongoose.js file
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const mongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const expressLayouts=require('express-ejs-layouts');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./asserts'));
app.use(expressLayouts);
//extract style and script from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine','ejs');          
app.set('views','./views');              
app.use(session({
    // mongoStore is used to store the session cookie
    name:'to_do_app',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new mongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err)
    {
        console.log(err||'connect-mongodb setup');
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes')); 
app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error : ${err}`);//interpolation
    }
    console.log(`server is running on the port: ${port}`);//interpolation
});

