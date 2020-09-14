var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name:String,
    img:String,
    description:String,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    creator:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
});
module.exports  = mongoose.model("Campground",campgroundSchema);
