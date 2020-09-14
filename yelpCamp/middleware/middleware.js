var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = {};

middleware.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error","please login to continue");
        res.redirect("/login");
    }
}

middleware.isUser = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,selected_camp){
            if(err){
                req.flash("error","camp does not exist");
                console.log(err);
            }else{
                if(selected_camp.creator.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","do not have permission to do that");
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error","please login to continue")
        res.redirect("back");
    }
}

middleware.isAuthor = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,selected_comment){
            if(err){
                req.flash("error","comment does not exist");
                console.log(err);
            }else{
                if(selected_comment.author.username == req.user.username){
                    next();
                }else{
                    req.flash("error","do not have permission to do that");
                    res.redirect("/campgrounds");
                }
            }
        })
        
    }else{
        req.flash("error","please login to continue");
        res.redirect("/login");
    }
}

module.exports = middleware;