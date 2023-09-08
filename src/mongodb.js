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
const LogInSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
})

// creating a collections
const collection = mongoose.model("collection1",LogInSchema);

// exporting to use in somether part of js files
module.exports = collection;


// xYF6exMBZqXQLDfI