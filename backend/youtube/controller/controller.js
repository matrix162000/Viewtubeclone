const apiKey = "AIzaSyC7sWeL1tIQ4ttR05-GiDKAL_OViIpN5M4";
const baseApiUrl = "https://www.googleapis.com/youtube/v3";
const axios = require('axios')

async function SearchVideo(req,res){
    const searchQuery = req.query.search_query;
    const url= `${baseApiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}&maxResults=21`;
    const response= await axios.get(url);
    //const titles = response.data.items.map((item) => item.snippet.title);
    res.status(200).send(response.data.items);
    
}
async function Popular(req,res){
    const url=`${baseApiUrl}/videos?part=snippet&chart=mostPopular&regionCode=in&maxResults=10&key=${apiKey}`;
    const response=await axios.get(url);
    //const titles= response.data.items.map((item)=>item.snippet.title);
    res.send(response.data.items)
}

async function Category(req,res){
    const videoId=req.query.videoCategoryId;
    const url = `${baseApiUrl}/videos?part=snippet&regionCode=in&maxResults=10&videoCategoryId=${videoId}&chart=mostPopular&key=${apiKey}`;
    const response = await axios.get(url);
    //const titles= response.data.items.map((item)=>item.snippet.title);
    res.send(response.data.items);
    //res.send(titles);
}



module.exports = {SearchVideo,Popular,Category}