const User = require("../models/user");


module.exports.renderAuth = (req, res) => {
    res.render("users/auth.ejs"); // this is your combined login/signup page
}

module.exports.signup = async(req, res)=>{
    try{
    let {username, email, password} = req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to wanderlust!");
        res.redirect("/listings");
    }); 
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/auth");    
    }
}   

module.exports.login =  async(req, res)=>{
    req.flash("success", "Weclome back to travel");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logOut = (req, res, next)=>{
    req.logOut((err)=>{
        if(err){
        return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
}