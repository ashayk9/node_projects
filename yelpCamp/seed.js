var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:"Salmon creek",
        img:"https://www.nps.gov/thingstodo/images/MAHE_150628_KW-2064_PEOPLE-bicentennial-crop.jpg",
        description:"(node:11068) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 3): MongoParseError: Invalid connection string (node:11068) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code."
    },
    {
        name:"Granite Hill",
        img:"https://www.fodors.com/wp-content/uploads/2019/02/camp-hero.jpg",
        description:"(node:11068) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 3): MongoParseError: Invalid connection string (node:11068) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code."
    },
    {
        name:"Salmon creek",
        img:"https://www.nps.gov/thingstodo/images/MAHE_150628_KW-2064_PEOPLE-bicentennial-crop.jpg",
        description:"(node:11068) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 3): MongoParseError: Invalid connection string (node:11068) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code."
    },
    {
        name:"Granite Hill",
        img:"https://www.fodors.com/wp-content/uploads/2019/02/camp-hero.jpg",
        description:"(node:11068) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 3): MongoParseError: Invalid connection string (node:11068) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code."
    },
]
function seedDb()
{
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("campgrounds removed");
            data.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("campground added");
                        // Comment.create({
                        //     content:"wow !!",
                        //     author:"me"
                        // },function(err,c){
                        //     if(err){
                        //         console.log(err);
                        //     }else{
                        //         campground.comments.push(c);
                        //         campground.save();
                        //         console.log("comment added");
                        //     }
                        // });
                    }
                })
            });
        }
    });
    
}
module.exports = seedDb;