const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://whitelegend56:xYF6exMBZqXQLDfI@website.ddp2glq.mongodb.net/play-boiapp",{
    useNewUrlParser:true,useUnifiedTopology:true
})
.then(()=>{
    console.log("mongodb connected to palyboi-app db");
})
.catch(()=>{
    console.log("failed to connect");
})

// DEFINING THE SCHEMA 

const MsgSchema = new mongoose.Schema({
    usermsg:{
        type:String,
        required:true
    },
    
},{timestamps: true});

// creating a collections

const msgcolelction = mongoose.model("collection", MsgSchema);

// exporting to use in somether part of js files
module.exports = msgcolelction;


// xYF6exMBZqXQLDfI