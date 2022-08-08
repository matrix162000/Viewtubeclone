const FavoriteModel = require('../Model/favoriteModel')
const {AddFavorite ,GetFavorite ,RemoveFavorite} = require('../Repository/favoriteRepository')

//Add to favorite
function AddToFavorite(req,res){
    AddFavorite(req.body).then(data=>{
        res.status(200).send(data);
    }).catch(data=>{
        res.status(404).send(data);
    })
   


}

// to get favorite
function GetFromFavorite(req,res){
    const userid= req.query.userid;
    GetFavorite(userid).then(data=>{
        res.status(200).send(data);
    }).catch(data=>{
        res.status(404).send(data);
    })

}


// remove from favorite
function RemoveFromFavorite(req,res){
    RemoveFavorite(req.body).then(data=>{
        res.status(200).send(data);
    }).catch(data=>{
        res.status(404).send(data);
    })
}


module.exports = {AddToFavorite,GetFromFavorite,RemoveFromFavorite}