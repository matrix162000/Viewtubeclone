import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import YouTube from 'react-youtube';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "../config";

const Card = (props) => {
  console.log(props.videoId);
  async function addToFavourite() {

    let response = await axios.post(config.addUrl,
      {
        userid: localStorage.getItem("userid"),
        videoId: props.videoId,
        channelTitle: props.channelName,
        title: props.title,
      }
    );
    toast('Video Added To Favorite List Successfully ', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      }) 
  }

  // };
  const opts = {
    height: '150',
    width: '250',
    autoplay: 0,
    fs: 0,
    modestbranding: 1,
  }
  return (
    <>
      <div className="card" style={{ width: "300px", height: "330px", margin: '20px 10px' }}>
        <Link to={`/video/${props.videoId}`} style={{ textDecoration: "none", overflow: "hidden" }}>
          <div className="d-flex justify-content-center align-items-center mt-2" >
            <YouTube videoId={props.videoId} opts={opts} showInfo="false" />
          </div>
          <div className="card-body">
            <p className="card-title" style={{ fontSize: '14px' }} >{props.title}</p>
            <p className="card-text" style={{ fontSize: '14px' }}>{props.channelName}</p>
          </div>
        </Link>
        {localStorage.getItem("userid") ?
          < Button variant="secondary" size="sm" onClick={addToFavourite} >Add</Button>
          :
          null
        }
      </div>
    </>
  );
};

export default Card;
