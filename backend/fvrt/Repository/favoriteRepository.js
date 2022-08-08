const FavoriteModel = require('../Model/favoriteModel');


function AddFavorite(info) {

    return new Promise((resolve, reject) => {
        FavoriteModel.findOne({ userid: info.userid }, (err, user) => {
            
            if (!user) {
                const Favorite = new FavoriteModel({
                    userid: info.userid,
                    favoriteVideoArr: [
                        {
                            videoId: info.videoId,
                            title: info.title,
                            channelTitle: info.channelTitle,
                            // imageUrl: info.imageUrl
                        }
                    ]

                })

                Favorite.save((err) => {
                    if (!err) {
                        resolve("Video Added To Favorite Successfully");
                    }
                })

            }

            else if (user) {

                FavoriteModel.findOneAndUpdate({ userid: info.userid }, {
                    $push: {
                        favoriteVideoArr: {

                            videoId: info.videoId,
                            title: info.title,
                            channelTitle: info.channelTitle,


                        }
                    }
                }, (err, data) => {
                    if (!err) {

                        resolve("Video Added To Favorite Successfully");
                    }
                })

            }
            else {
                reject(err);
            }
        })
    })
}


function GetFavorite(userid) {
    return new Promise((resolve,reject)=>{
        FavoriteModel.findOne({userid:userid},(err,user)=>{
            if(!err&&user){
                resolve(user);
            }
            else{
                reject('User not found');
            }
        })
    })
}


//to remove form favorite
function RemoveFavorite(info){
    return new Promise((resolve,reject)=>{
        FavoriteModel.findOneAndUpdate(
            { userid: info.userid },
            { $pull: { favoriteVideoArr: { videoId:info.videoId } } },
            (err,data)=>{
                if(!err&&data){
                    console.log(data);
                    resolve("video removed from favoritelist successfully");
                }
                else {
                    reject("this video is not in favorite list");
                }
            }
        )
    })
}

module.exports = { AddFavorite,GetFavorite,RemoveFavorite }