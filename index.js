
const qr = require("qrcode");
const express = require("express")

const mongoose=require("mongoose")
const Users = require("./Models/Users")
const Booking = require("./Models/Booking")
mongoose.connect("mongodb://127.0.0.1:27017/museumticketbooking", {
    keepAlive: true,
}).then(() => console.log('MongoDB Connected') ).catch(err => console.log("e"));
mongoose.set('debug', true);

const bodyparser = require("body-parser");
const app = express()
const encoder = bodyparser.urlencoded()
app.use(bodyparser.json())
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})
app.get("/index1",(req,res)=>{
    res.sendFile(__dirname+"/index1.html")
})
app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/login.html")
})
app.get("/booking",(req,res)=>{
    res.sendFile(__dirname+"/booking.html");
})
app.post("/index1",encoder,function(req,res){
  
    var InsterData = [{
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }]
    Users.insertMany(InsterData).then((getData) => {
        console.log(getData)
        res.json({
          data: getData,
          Result: true,
        })
        res.redirect('/');
    })
})
app.post("/login",encoder,function(req,res){

    var email1=req.body.email1;
    var password1=req.body.password1;
    Users.find({email1 : email1,password1 : password1}).then((getData)=>{
        if(getData.length > 0){
            res.redirect("/");
        }
        else{
            res.send({Message : "User Name and Password wrror"});
        }
    })
    
})
app.post("/booking",encoder,function(req,res){
    var museum = req.body.museum;
    var datepicker = req.body.datepicker;
    var cperson = req.body.cperson;
    var cmobile = req.body.cmobile;
    var email = req.body.email;
    var nationality = req.body.nationality;
    var adult = req.body.adult;
    var children = req.body.children;
    var still =req.body.still;
    var video = req.body.video;
    var tamt = req.body.tamt;
    
    var InsterData = [
        {
            museum : museum,
            datepicker : datepicker,
            cperson :cperson ,
            cmobile : cmobile,
            email : email,
            nationality : nationality,
            adult :adult ,
            children :children ,
            still : still,
            video : video,
            tamt :tamt ,
        }
    ]
    Booking.insertMany(InsterData).then((getData)=>{

        const z=["Name:"," ",cperson," "," date :",datepicker," "," Number of Adults :",adult," "," Number of children :",children," "," Number of Camera :",still," "," Total Amount :",tamt];

        if(cperson.length===0) res.send("Empty Data!");
        qr.toDataURL(z,(err,src)=>{
            if(err) res.send("error ");
            res.render("scan",{src});
        })
    })
})
app.listen(2222,()=>{
    console.log("Listening port :2222")
});
