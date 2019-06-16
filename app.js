var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser");
var amt =0,credit=0,addamt=0,idtodelete=0,subamt=0,deletecredit=0;
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost/users");
var userSchema = new mongoose.Schema({
    name:String,
    email:String,
    credit:Number
});
var users = mongoose.model("users",userSchema);
mongoose.set('useFindAndModify', false);

var ret = users.find({name:"abhijith"},function(err,res){
    if(!res.length){
        users.create({
            name:"abhijith",
            email:"abhijith@gmail.com",
            credit:150
        },function(err,users){
            if(err){    console.log(err)}
           // else {  console.log(users);}
        });
        users.create({
            name:"rawn",
            email:"rawn@gmail.com",
            credit:100
        },function(err,users){
            if(err){    console.log(err)}
            //else {  console.log(users);}
        });
        users.create({
            name:"shawn",
            email:"shawn@gmail.com",
            credit:100
        },function(err,users){
            if(err){    console.log(err)}
            //else {  console.log(users);}
        });
        users.create({
            name:"shriram",
            email:"shriram@gmail.com",
            credit:150
        },function(err,users){
            if(err){    console.log(err)}
            //else {  console.log(users);}
        });
        
        users.create({
            name:"peter",
            email:"peter@gmail.com",
            credit:100
        },function(err,users){
            if(err){    console.log(err)}
            //else {  console.log(users);}
        });
        
        users.create({
            name:"vaishnav",
            email:"vaishnav@gmail.com",
            credit:120
        },function(err,users){
            if(err){    console.log(err)}
            //else {  console.log(users);}
        });
    }
   
});



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

users.findByIdAndUpdate(req.params.id,{},function(err,founduser){
   users
        if(err){
            console.log(err);
        }
        else{
            idtodelete = founduser.id;
            deletecredit= founduser.credit;
            res.render("show",{users:founduser});
        }
       

    })



    // var id = mongoose.Types.ObjectId(req.params.id);
    // users.findOne({_id: req.params.id },function(err,founduser){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         idtodelete = founduser.id;
    //         deletecredit= founduser.credit;
    //         res.render("show",{users:founduser});
    //     }
       

    // })
    
   
})


app.post("/credit",function(req,res){
    
    users.find({},function(err,users){
        if(err){
            console.log(err)
        }
        else   {
            res.render("select.ejs",{users:users});

        }
    });
   
    amt = Number(req.body.credit);
    
});
//till here it's error free



app.get("/user/:id/change",function(req,res){
    // res.send(amt);
    users.findById(req.params.id,function(err,founduser){
        if(err){
            console.log(err);
        }
        else{
            
            credit=Number(founduser.credit);
            
           
        }
    
    
    addamt=credit+amt;
    subamt = deletecredit - amt;

   
    


    

    //Addition
if(req.params.id != idtodelete){

    users.findByIdAndUpdate(req.params.id,{$set: {credit:addamt} },function(err,user){
        if(err){
            console.log(err);
        }
        else{
        users.findByIdAndUpdate(idtodelete,{$set: {credit:subamt}},function(err,users){
            if(err){
                console.log(idtodelete)
               
            }
        })
        res.redirect("/user");
    }
    })
}
else{
res.redirect("/user");
      }
      })
    
  

    
})



app.listen(3000,function(){
    console.log("server has started");
});