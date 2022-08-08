import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import YouTube from 'react-youtube';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "../config";




const CardF = (props) => {
  const navigate = useNavigate();
  console.log(props.videoId);

  async function deleteFromFavourite() {

    let response = await axios.put(config.removeUrl,
      {
        userid: localStorage.getItem("userid"),
        videoId: props.videoId,
      }
    );
    console.log(response.statusText);
    if (response.statusText === "OK") {
      props.onClick();
      toast('Video Removed From Favorite List Successfully ', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }) 
    }

  }
  const opts = {
    height: '150',
    width: '250',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      fs: 0,
      modestbranding: 1,
    },
  };
  return (
    <><div className="card" style={{ width: "300px", height: "330px", margin: '20px 10px' }}>
      <Link to={`/video/${props.videoId}`} style={{ textDecoration: "none", overflow: "hidden" }}>
        <div className="d-flex justify-content-center align-items-center mt-2" >
          <YouTube videoId={props.videoId} opts={opts} showInfo="false" />
        </div>
        <div className="card-body">
          <p className="card-title" style={{ fontSize: '14px' }} >{props.title}</p>
          <p className="card-text" style={{ fontSize: '14px' }}>{props.channelName}</p>
          {!localStorage.getItem("userid")}
        </div>
      </Link>
      <Button variant="secondary" size="sm" onClick={deleteFromFavourite} >Remove</Button>
    </div>

    </>
  );
};

export default CardF;

// <Link to={`/video/${props.videoId}`} style={{ textDecoration: "none" }}>
//       <Container type={props.type}>
//       <YouTube videoId={props.videoId} opts={opts} showInfo="false" />;
//         <Details type={props.type}>
//           <Texts>
//             <Title>{props.title}</Title>
//             <ChannelName className="channel-title" style={{color:"black"}}>{props.channelName}</ChannelName>
//           </Texts>
//         </Details>
//       </Container>
//     </Link>
//     <button onClick={deleteFromFavourite}>Remove</button>