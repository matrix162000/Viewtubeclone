import React, { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
// import Menu  from "./Menu";
import NavbarTop from "./NavbarTop";
import SideBar from "./sidebar";
import "../components/sidebar.css"
import { useEffect } from "react";
import axios from "axios"
import "./landing.css"
import { useNavigate, useLocation, } from "react-router-dom";
import config from "../config";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Landing = () => {
  // const[search,setSearch]=useState("");
  const [videos, setVideo] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);

  useEffect(() => {

    if (location.state) {
      console.log('location'+location);

      if (location.state.userid) {

        localStorage.setItem("userid", location.state.userid);

      }
    }

    async function data() {
      try {

        let response = await axios.get(config.popularUrl);
        console.log(response)
        setVideo(response.data)
      }
      catch (error) {
        console.error(error.response.data);     // NOTE - use "error.response.data` (not "error")
      }

    }
    data();


  }, []);

  async function callback(search) {
    // setSearch(search);
    console.log(search)
    //console.log(video.data);
    let response = await axios.get(config.searchUrl,
      {
        params: { search_query: search }
      }
    );
    console.log(response.data);
    setVideo(response.data)
  }

  return (
    <>
      <NavbarTop onClick={callback} />
      <div className="landing">
      
        <SideBar />
        <div className="video-grid" style={{overflow: 'hidden'}}>
          {
            videos.map(video => {
              return (
                <Card videoId={video.id.videoId ? video.id.videoId : video.id}
                  title={video.snippet.title ? video.snippet.title : video.snippet.localized.title}
                  channelName={video.snippet.channelTitle} />
              )
            })

          }
        </div>

        {/* <Card videoId="lhu6hXf5bpQ"  /> */}
      </div>
    </>
  );
};

export default Landing;
