import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import profileImg from "../assets/profile.png";
import viewtubeImg from "../assets/viewtube.png";
import { Link } from "react-router-dom";



const GetProfile = (props) => {
  const [profile, setProfile] = useState({});
  useEffect(async () => {
    let token = document.cookie.split('=')[1];
    const { data } = await axios.get(config.GetProfileURL, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }, withCredentials: true
    });
    console.log(data[0])
    setProfile(data[0]);
    console.log(profile);


  }, [])

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand style={{ margin: "auto" }} >View <img style={{ height: '35px', width: "35px" }} src={viewtubeImg} /> Tube</Navbar.Brand>

            </Container>
          </Navbar>
          <div className="col-md-5 mt-6" style={{ marginTop: "90px" }}>
            <div>
              <h1 style={{ marginLeft: "15px" }} className="my-4  font-weight-bold .display-4">User Profile</h1>
              <div style={{ marginLeft: "20px" }} >
                <h3 >
                  <span style={{float: "left"}}>First Name:&nbsp;</span>
                  <span  style={{color:"grey"}}>{profile.firstName}</span>
                  
                </h3>
                <br></br>
                <h3 >
                  <span style={{float: "left"}}>Last Name:&nbsp;</span>
                  <span style={{color:"grey"}}>{profile.lastName}</span>
                  
                </h3>
                <br></br>
                <h3 >
                  <span style={{float: "left"}}>Email:&nbsp;</span>
                  <span style={{color:"grey"}} >{profile.email}</span>
                  
                </h3>
                <br></br>
                <p style={{ textAlign:"justify" }}>Go Back  <Link to="/" style={{ textDecoration: "none" }}>back </Link></p>
                
              </div>
                

            </div>
          </div>
          <div className="col-md-7 my-auto">
        <img style={{width:"56%",minWidth:"350px" ,padding:"90px 0px 0px 120px"}}className="img-fluid w-70" src={profileImg} alt=""/>
        </div>
        </div>
      </div>

      <div style={{width:"100%", textAlign:"center",height:"40px", marginTop:"117px",backgroundColor:"darkgrey"}}><h5 style={{color:"white",paddingTop:"6px"}}>ViewTube &copy; 2022</h5></div>

    </>
  )

}

export default GetProfile;