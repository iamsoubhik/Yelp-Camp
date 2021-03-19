var mongoose = require ("mongoose");
var Campground = require("./models/campground");


function seedDB(){
    //remove all campgrounds
Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("remove campgrounds !");
});
}
module.exports = seedDB;
