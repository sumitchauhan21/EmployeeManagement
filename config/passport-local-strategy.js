// PASSPORT SETUP
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
function(req,email,password,done)
{
    //find a user
    User.findOne({email:email},function(err,user)
    {
        if(err)
        {
            console.log('error in finding user');
            req.flash('error',err);
            return done(err);
        }
        if(!user||user.password!=password)
        {
            console.log('invalid username/password');
            req.flash('error','Invalid username/password');
            return done(null,false);
        }
        return done(null,user);
    });
} 
));
//serialize the user to decide which key is to kept in the cookies.
passport.serializeUser(function(user,done)
{
     done(null,user.id);
});
//deserialize the user from the key in the cookies.
passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log('error in finding');
            return done(err);
        }
        return done(null,user);
    });
});
// How to check wether user has sign in or not
passport.checkAuthentication = function(req,res,next)
{
    if(req.isAuthenticated()){
        return next();
    }
    //if user not sign in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req,res,next)
{
    if(req.isAuthenticated()){
          res.locals.user = req.user
    }
    next();
}
module.exports = passport;