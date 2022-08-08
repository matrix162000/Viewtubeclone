const mongoose = require('mongoose');


const favoriteSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true,
    },
    favoriteVideoArr:[{
        videoId:String,
        title:String,
        channelTitle:String,

    }]

    
})


//creating collection by using userSchema
const Favorite = mongoose.model('Favorite',favoriteSchema);
module.exports = Favorite;