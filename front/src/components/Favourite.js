import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import "./landing.css";
import NavbarTop from './NavbarTop';
import SideBar from './sidebar';
import Card from './Card';
import axios  from "axios";
import CardF from './CardF';
import config from '../config';
const Favourite=()=>{
    const [videos,setVideo]=useState([]);
    useEffect(()=>{
      
        async function data(){
          try {
          
            let response = await axios.get(config.getUrl,
            { 
              params:{userid:localStorage.getItem("userid")} }
            );
           
          console.log(response)
          setVideo(response.data.favoriteVideoArr)
          }
           catch (error) {
            console.error(error.response.data);     // NOTE - use "error.response.data` (not "error")
          }
    
        }
        data();
      
     },[]);

     async function callback(){
     
      let response = await axios.get(config.getUrl,
      { 
        params:{userid:localStorage.getItem("userid")} }
      );
     
    console.log(response)
    setVideo(response.data.favoriteVideoArr)
    }

    return (
        <>
    <NavbarTop />
    <div className="landing">
      <SideBar />

       <div className="video-grid">
       
      {
        videos.map(video => {
          return (
          <CardF onClick={callback} videoId={video.videoId} 
          title={video.title} 
          channelName={video.channelTitle}/> 
          )
        })
        
      }
      </div> 

      {/* <Card videoId="lhu6hXf5bpQ"  /> */}
  </div>
    </>
    )
}
export default Favourite;