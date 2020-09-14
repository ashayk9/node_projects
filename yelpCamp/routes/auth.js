var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/register",(req,res)=>{
    res.render("auth/register");
});

router.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            console.log(err.message);
            res.redirect("/register");
            //return res.render("auth/register");
        }else{
          passport.authenticate("local")(req,res,function(){
            //console.log("logged in");
                req.flash("success",`registered successfully Welcome ${user.username}`);
                res.redirect("/campgrounds");
        });
        }
       
            
            //console.log("registered")
        
       
        
    })
    // console.log(req.body.user.username);
    // console.log(req.body.user.password);
    // res.send("post register");
});
    

router.get("/login",(req,res)=>{
    res.render("auth/login");
});
router.post("/login",passport.authenticate("local",{
  failureFlash:"incorrect username or password",
  failureRedirect:"/login",
}),(req,res)=>
{
    req.flash("success",`logged in successfully ${req.user.username}`);//welcome ${currentUser.username}
    res.redirect("/campgrounds");
    
}
); 

// router.post("/login",passport.authenticate("local",
// {
//     successRedirect:"/campgrounds",
//     failureRedirect:"/login",
//     failureFlash:"incorrect username or password",
//     successFlash:`logged in successfully `//welcome ${currentUser.username}
// })
// ); 
// router.get("/logout",(res,req)=>{
//     req.logout();
//     req.flash("success","logged u out");
//     res.redirect("/campgrounds");
// })
router.get('/logout', function(req, res, next) {
    if (req.session) {
      
      //req.flash("success","logged u out");
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          //req.flash("success","logged u out");
          
          return res.redirect('/campgrounds');
        }
      });
      
    }
  });

  

 

module.exports = router;

