const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    secretQuestion:{
        type:String,
        require:true
    }

    
})


//creating collection by using userSchema
const User = mongoose.model('User',userSchema);
module.exports = User;