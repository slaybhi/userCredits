var express     = require("express"),
    app         = express(), 
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/users");
var userSchema = new mongoose.Schema({
    name:String,
    email:String,
    credit:Number
});
var users = mongoose.model("users",userSchema);
// users.create({name:"Rawn",email:"a.abhijith1adoor@gmail.com",credit:50},function(err,users){
//     if(err){console.log(err)}
//     else{console.log(users)}
// });

//app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get('/',function(req,res){
    res.render("home");
});

app.get('/user',function(req,res){                                      //list all the users

    users.find({},function(err,users){
        if(err){
            console.log(err)
        }
        else   {
            res.render("userlist",{users:users});
        }
    })

   
});

app.get("/user/:id",function(req,res){
    users.findById(req.params.id,function(err,founduser){
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{users:founduser});
        }
    })
   
})



app.listen(3000,function(){
    console.log("server has started");
})