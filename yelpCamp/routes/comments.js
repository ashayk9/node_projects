var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/middleware");
//const comment = require("../models/comment");

router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,(req,res)=>{
    
    var id = req.params.id;
    Campground.findById(id,function(err,selected_camp){
        if(err){
            res.send(err);
        }else{
            res.render("comments/new",{selected_camp:selected_camp});
            //res.send("hi")
        }
    })
});

router.post("/campgrounds/:id/",middleware.isLoggedIn,(req,res)=>{
    var comment = req.body.comment;
    Comment.create(comment,function(err,newcomment){
        if(err){
            console.log(err);
        }else{
            newcomment.author.id = req.user._id;
            newcomment.author.username = req.user.username;
            newcomment.save()
            console.log(newcomment);
            Campground.findById(req.params.id,function(err,selected_camp){
                if(err){
                    res.send(err);
                }else{
                    selected_camp.comments.push(newcomment);
                    selected_camp.save()
                    console.log(selected_camp);
                    res.redirect(`/campgrounds/${selected_camp._id}`);
                }
            })
            
        }
    })
});

router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.isAuthor,(req,res)=>{
    Campground.findById(req.params.id,function(err,selected_camp){
        if(err){
            console.log(err);
        }else{
            Comment.findById(req.params.comment_id,function(err,selected_comment){
                if(err){
                    console.log(err);
                }else{ 
                    res.render("comments/edit",{selected_camp:selected_camp,selected_comment:selected_comment});
                }
            })
        }
    })
    
});
router.put("/campgrounds/:id/comments/:comment_id",middleware.isAuthor,(req,res)=>{
    Campground.findById(req.params.id,function(err,selected_camp){
        if(err){
            console.log(err);
        }else{
            Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updated){
                if(err){
                    console.log(err);
                }else{
                    res.redirect(`/campgrounds/${req.params.id}`);
                }
            })
        }
    })
});
router.delete("/campgrounds/:id/comments/:comment_id",middleware.isAuthor,(req,res)=>{
    Campground.findById(req.params.id,function(err,selected_camp){
        if(err){
            console.log(err);
        }else{
            Comment.findByIdAndRemove(req.params.comment_id,function(err,deleted){
                if(err){
                    console.log(err);
                }else{
                    req.flash("success","comment deleted");
                    res.redirect(`/campgrounds/${req.params.id}`);
                }
            })
        }
    })
});
// function isAuthor(req,res,next){
//     if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id,function(err,selected_comment){
//             if(err){
//                 console.log(err);
//             }else{
//                 if(selected_comment.author.username == req.user.username){
//                     next();
//                 }else{
//                     res.redirect("/campgrounds");
//                 }
//             }
//         })
        
//     }else{
//         res.redirect("/login");
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