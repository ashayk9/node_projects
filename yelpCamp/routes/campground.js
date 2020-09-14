var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/middleware");

router.get("/",(req,res)=>{
    res.render("landing");
});

router.get("/campgrounds",(req,res)=>{
    Campground.find({},function(err,allcampgrounds){
        if(err){
            res.send(err);
        }else{
            res.render("campground/campgrounds",{campgrounds:allcampgrounds,currentUser:req.user});  
        }
    })    
    //res.render("campgrounds",{campgrounds:campgrounds});
});

router.get("/campgrounds/new",middleware.isLoggedIn,(req,res)=>{
    res.render("campground/new");
});

router.post("/campgrounds",middleware.isLoggedIn,(req,res)=>{
    var name = req.body.name;
    var img = req.body.img;
    var description = req.body.description;
    var newcamp = {name:name,img:img,description:description};
    
    Campground.create(newcamp,function(err,newlycreated){
        if(err){
            console.log(err);
        }else{
            newlycreated.creator.id = req.user.id;
            newlycreated.creator.username = req.user.username;
            newlycreated.save()
            res.redirect("/campgrounds");
        }
    });
    
});

router.get("/campgrounds/:id",(req,res)=>{
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err,selected_camp){
        if(err){
            res.send(err);
        }else{
            
            res.render("campground/show",{selected_camp:selected_camp});
        }
    });
});

router.get("/campgrounds/:id/edit",middleware.isUser,(req,res)=>{
    var id = req.params.id;
    Campground.findById(id,function(err,selected_camp){
        if(err){
            console.log(err);
        }else{
            res.render("campground/edit",{selected_camp:selected_camp});
        }
    })
});
router.put("/campgrounds/:id",middleware.isUser,(req,res)=>{
    var id = req.params.id;
    Campground.findByIdAndUpdate(id,req.body.camp,function(err,selected_camp){
        if(err){
            console.log(err);
        }else{
            res.redirect(`/campgrounds/${id}`);
        }
    })
});

router.delete("/campgrounds/:id",middleware.isUser,(req,res)=>{
    var id = req.params.id;
    Campground.findByIdAndRemove(id,function(err,deleted){
        if(err){
            console.log(err);
        }else{
            req.flash("success","campground deleted");
            res.redirect("/campgrounds");
        }
    })
});
// function isUser(req,res,next){
//     if(req.isAuthenticated()){
//         Campground.findById(req.params.id,function(err,selected_camp){
//             if(err){
//                 console.log(err);
//             }else{
//                 if(selected_camp.creator.username === req.user.username){
//                     next();
//                 }else{
//                     res.redirect("back");
//                 }
//             }
//         })
//     }else{
//         res.redirect("back");
//     }
// }
// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     else{
//         res.redirect("/login");
//     }
// }

module.exports = router;