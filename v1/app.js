var express=require("express");
var app=express();
var port=3000;
var bodyParser=require("body-parser");
var mongoose=require("mongoose");  


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var campgrounds=[
    {name:"Salmon Creek", image: "https://images.pexels.com/photos/213807/pexels-photo-213807.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"Mountain rest", image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"Thomson Creek", image: "https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"Vally Thomson", image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"Allen Solly", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf85254784c762e7cd39645_340.jpg"},
    {name:"Grand Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f1dc84609620367d1c3ed9e04e507440702c7ad3904ccd_340.jpg"},
    {name:"Holy Ground", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507440702c7ad3904ccd_340.jpg"},
    {name:"Party Vally", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440702c7ad3904ccd_340.jpg"}
];
app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req, res){
    
    res.render("campgrounds",{campgrounds:campgrounds}); 
});

app.post("/campgrounds", function(req,res){
    var name=req.body.name;
    var image=req.body.image; 
    var newCampground={name:name, image:image}
    campgrounds.push(newCampground);
    //get data from form and add to campgrounds array
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

//send the data to the campground
//add the new campground in the application
app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs")
});



app.listen(3000,function(){
    console.log("http://localhost:3000");
});