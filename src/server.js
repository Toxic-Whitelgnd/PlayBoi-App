const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const collection = require("./mongodb");
const msgcolelction = require("./chatmsgs");


app.use(express.json());
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}));
// THIS WILL USE TO LOAD THE FILES FROM THE PUBLIC TO THE VIEWS FOLDER ;[
app.use('/public/',express.static('./public'));

// path
const viewpath = path.join(__dirname,"../views");
app.set("views",viewpath);

// GET REQUEST
app.get('/',(req,res)=>{
    res.render("pages/entry")
})

app.get('/login',(req,res)=>{
    res.render("pages/login")
})

app.get('/register',(req,res)=>{
    res.render("pages/register")
})

app.get('/girls',(req,res)=>{
    res.render("pages/girls")
})

app.get('/home',(req,res)=>{
    res.render("pages/home")
})

// POST REQUEST
app.post('/register',async (req,res)=>{
    const data = {
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    }

    await collection.insertMany([data]).then((docs)=>{
        console.log(docs);
        res.render("pages/home");
    })
    .catch((err)=>{
        console.log(err);
    });


})

// 
app.post('/chat',async (req,res)=>{
    
    const data1 = req.body;
    console.log(data1.userMsg);
    var val = {
        usermsg:data1.userMsg,
    }

    await msgcolelction.insertMany([val]).then((docs)=>{
        console.log(docs);
    })
    .catch((err)=>{
        console.log(err);
    });
})

app.post("/login",async (req,res)=>{
    try{
    const check = await collection.findOne({name:req.body.name})
    if(check.password === req.body.password){
        res.render("pages/home");
    }
    else{
        res.send("Wrong password")
    }
}
catch{
    res.send("wrong details")
}
})

// MAKING THE PORT TO LISTEN ON THE SERVER
app.listen(9999,() => {
    console.log("listening on");
    console.log("http://localhost:9999/")
});