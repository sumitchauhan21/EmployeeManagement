// USER CONTROLLER -> ALL ACTIONS OF USER
const User = require('../models/user');
const Employee = require('../models/employee');
module.exports.signup=function(req,res)
{ 
    // sign up page only available if user is new/not sign up.
    if(req.isAuthenticated())
    {
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"to do | sign up"
    });
}
module.exports.signin=function(req,res)
{
    // sign page is only available if user not sign in.
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
         title:"to do | sign in"
    });
}
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password)
    {
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err)
        {
            req.flash('error', err);
            return;
        }
        if(!user)
        {
            //create the user db.
            User.create(req.body,function(err,user)
            {
                if(err)
                {
                    req.flash('error', err);
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            // alert("user already exist");
            req.flash('error', 'User already exist');
            return res.redirect('back');
        }
    });
}
module.exports.createSession = function(req,res)
{
    req.flash('success','Logged in successfuly');
    return res.redirect('/users/profile');
}
module.exports.profile = function(req,res)
{
    Employee.find({}).populate('user').exec(
        function (err,employee,) {
            return res.render('profile',{
                title:"to do | profile page",
                employee_list:employee,
        });
    });
}
module.exports.destroySession = function(req,res)
{
    req.logout();
    req.flash('success','You have logged out');
    return res.redirect('/');
}
module.exports.createEmployee =function(req,res)
{
    return res.render('create_employee',{
         title:"create employee",
         heading:"Insert"
     });
}
module.exports.createEmployeeDone = function(req,res)
{
    
            Employee.create({
                fullname:req.body.fullname,
                email:req.body.email,
                mobile:req.body.mobile,
                address:req.body.address,
                salary:req.body.salary,
                dateofjoining:req.body.dateofjoining,
                manager:req.body.manager,
                gender:req.body.gender,
                employmentstatus:req.body.employmentstatus,
                department:req.body.department,
                user:req.user._id
            },
            function(err,newEmployee){
                if(err)
                {
                    console.log("error in creating a employee",err);
                    req.flash('error',err);
                    return;
                }
                req.flash('success','New Employee created successfully');
                return res.redirect('/users/profile');
            });
}        
module.exports.deleteEmployee = function(req,res)
{
    let id=req.query.id;
    Employee.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
            console.log("error in deleting employee",err);
            req.flash('error',err);
            return;
        }
        req.flash('success', 'Employee deleted successfully');
        return res.redirect('back');
    });
}
module.exports.updateEmployee = function(req,res)
{
    Employee.findById(req.params.id,function(err,employee)
    {
        if(!err)
        {
            return res.render('update_employee',{
               title:'Update Employee',
               employee:employee
           });
        }
        else{
            console.log(err);
            req.flash('error',err);
            return;
        }
    });
}

//user update
module.exports.updateUser = function(req,res)
{
    User.findById(req.params.id,function(err,user)
    {
        if(!err)
        {
            return res.render('update_user',{
               title:'Update User',
               user:user
           });
        }
        else{
            console.log(err);
            req.flash('error',err);
            return;
        }
    });
}
module.exports.updated = function(req,res)
{
    Employee.findByIdAndUpdate(req.params.id,req.body,function(err,employee){
        req.flash('success', 'updated seccessfully');
        return res.redirect('/users/profile');
    });

}
//userUpdated
module.exports.userUpdated = function(req,res)
{
    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
        if(!err)
        {
            req.flash('success', 'updated seccessfully');
           return res.redirect('/users/profile');
        }
        else{
            console.log('error',err);
        }
    });
}