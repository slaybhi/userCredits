var express     = require("express"),
    app         = express(), 
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/users");

//app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get('/',function(req,res){
    res.render("home");
});

app.get('/user',function(req,res){                                      //list all the users
    var users= [

        {name:"Abhijth",email:"abc@gmail.com",credit:100},
        {name:"Abhijth",email:"abc@gmail.com",credit:100},
        {name:"Abhijth",email:"abc@gmail.com",credit:100},
        {name:"Abhijth",email:"abc@gmail.com",credit:100},       
        {name:"Abhijth",email:"abc@gmail.com",credit:100},

];


    res.render("userlist",{users:users});
});



app.listen(3000,function(){
    console.log("server has started");
})