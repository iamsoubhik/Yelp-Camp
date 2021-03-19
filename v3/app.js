var express=require("express");
var app=express();
var port=3000;
var bodyParser=require("body-parser");
var mongoose=require("mongoose");  
var passport = require ("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");




//schema setup
var campgroundSchema=new mongoose.Schema({
    name:String,
    image:String,
    description : String
});


var Capmground = mongoose.model("Campground" , campgroundSchema);

// Capmground.create(
//     {
//         name: "Salmon Creek", 
//         image: "https://images.pexels.com/photos/213807/pexels-photo-213807.jpeg?auto=compress&cs=tinysrgb&h=350",
//         description: "This is huge salmon creek hill , no bathrooms"
//     },
//      function(err, campground){
//     if(err)
//     {
//         console.log(err);
//     }else{
//         console.log("Newly created campground : ");
//         console.log(campground);
//     }
// });

// var campgrounds=[
//     {name:"Salmon Creek", image: "https://images.pexels.com/photos/213807/pexels-photo-213807.jpeg?auto=compress&cs=tinysrgb&h=350"},
//     {name:"Mountain rest", image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
//     {name:"Thomson Creek", image: "https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?auto=compress&cs=tinysrgb&h=350"}
    
// ];

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret : "Once again Rusty wins cutest dog!",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
    res.render("landing");
});

//Index- show all campgrounds
app.get("/campgrounds",function(req, res){
    //get all campground from db
    Capmground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{campgrounds:allCampgrounds}); 
        }
    });
    //res.render("campgrounds",{campgrounds:campgrounds}); 
});

//create -add new campgrounds to db
app.post("/campgrounds", function(req,res){
    var name=req.body.name;
    var image=req.body.image; 
    var desc=req.body.description; 
    var newCampground={name:name, image:image , description: desc}
    // campgrounds.push(newCampground)
    //now create a new campground and save to database
    Capmground.create(newCampground,function(err, newlyCreated) {
        if(err){
            console.log(err);
        }
        else{
            // redirect to campgrounds
            res.redirect("/campgrounds");
        }
        
    });
    //get data from form and add to campgrounds array
    //redirect back to campgrounds page
});

//send the data to the campground
//add the new campground in the application

// new- show from to create new campgrounds
app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs")
});


//show more info about campgrounds
app.get("/campgrounds/:id",function(req,res){
    //find the campground with provided id
    Capmground.findById(req.params.id, function(err, foundCampground) {
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
})


//AUTH ROUTES
//SHOW REGISTER FORM



app.listen(3000,function(){
    console.log("http://localhost:3000");
});