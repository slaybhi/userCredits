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
            idtodelete = founduser.id;
            deletecredit= founduser.credit;
            res.render("show",{users:founduser});
        }
       

    })
    
   
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

   
    


    console.log(credit,amt,addamt,subamt,deletecredit,idtodelete);

    //Addition

    users.findByIdAndUpdate(req.params.id,{$set: {credit:addamt} },function(err,user){
        if(err){
            console.log(err);
        }
        else{
        users.findByIdAndUpdate(idtodelete,{$set: {credit:subamt}},function(err,users){
            if(err){
                console.log(idtodelete)
               // console.log(err);
            }
        })
        res.redirect("/user");
    }
    })

    // users.update({_id:req.params.id},{ $set: {credit:100},function(sum){
    // console.log(sum);
    
    // }});


    })
    
  

    
})



app.listen(3000,function(){
    console.log("server has started");
});