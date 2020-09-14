var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var flash = require("connect-flash");
var methodOverride = require("method-override");


var campgroundRouter = require("./routes/campground");
var commentRouter = require("./routes/comments");
var authRouter = require("./routes/auth");
//var replyRouter = require("./routes/reply");


var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var SeedDb = require("./seed");
//const { initialize } = require("passport");

//SeedDb();
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(flash());
app.use(methodOverride("_method"));

//passport
app.use(require("express-session")({
    secret:"secret",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());






app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(campgroundRouter);
app.use(commentRouter);
app.use(authRouter);
//app.use(replyRouter);


//=================================================================================================


//=======================================================
//auth routes


app.listen(5000,function(){
    console.log("server started");
});