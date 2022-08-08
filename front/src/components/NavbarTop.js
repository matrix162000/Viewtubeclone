import React, { useEffect } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
//import "../components/navbar.css"
import logo from "../assets/logo.png"
import { Form } from "react-bootstrap"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import viewtubeImg from "../assets/viewtube.png";
import { useNavigate } from "react-router-dom";
import config from "../config";


const NavbarTop = (props) => {
  const [search, setSearch] = useState("");
  function handleChange(e) {
    console.log(search);
    const { value, name } = e.target;
    setSearch(prev => {
      return { ...prev, [name]: value }
    })

  }
  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault()
    console.log(search);
    // let data = await axios.get('http://localhost:5000/search',
    // { 
    //   params:{search_query:search} }
    // );
    props.onClick(search);
    // console.log(data);

  }
  function Logout() {
    localStorage.clear();
    let token = document.cookie;
    document.cookie = token + "=;expires=" + new Date(0).toUTCString();
    navigate('/Signin');
  }
  // const [profile, setProfile] = useState([]);
  // useEffect(async () => {
  //   let token = document.cookie.split('=')[1];
  //   const { data } = await axios.get(config.GetProfileURL, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": token
  //     }, withCredentials: true
  //   });
  //   console.log(data[0])
  //   setProfile(data[0]);
  //   console.log(profile);
  // }, [])

  return (
    <>
      <div className="container-fluid" style={{ zIndex: '1' }}>
        <div className="row">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ position: "fixed",zIndex: '1' }}>
            <Container>
              <Navbar.Brand style={{ marginRight: "30px" }}>View <img style={{ height: '35px', width: "35px" }} src={viewtubeImg} /> Tube</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Form className="d-flex" onSubmit={handleSubmit} style={{ margin: "auto" }}>
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      onChange={handleChange}

                    />
                    <Button variant="outline-success" type="submit">Search</Button>

                  </Form>

                </Nav>
                <Nav>
                  {!localStorage.getItem("userid")
                    ?
                    <div >
                      {/* <Button style={{ marginRight: "2px" }} variant="success" size="sm" onClick={() => navigate('/Signin')} >Sign In</Button>
                      <Button style={{ marginLeft: "2px" }} variant="success" size="sm" onClick={() => navigate('/Signup')}>Sign Up</Button> */}

                      <Nav.Link onClick={() => navigate('/Signin')}>Sign In</Nav.Link>
                      <Nav.Link  onClick={() => navigate('/Signup')}> Sign Up
                      </Nav.Link>
                    </div>
                    :
                    <Dropdown className="dropMenu">

                      <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropMenu">
                        <AccountCircleOutlinedIcon />
                        {/* {profile !== undefined
                          <> {profile.firstName }</>
                          :
                          null
                          } */}
                          Profile
                      </Dropdown.Toggle>

                      <Dropdown.Menu >
                        <Dropdown.Item > <Link to="/GetProfile" style={{ textDecoration: "none" }}>Profile </Link> </Dropdown.Item>
                        <Dropdown.Item > <Link to="/UpdateProfile" style={{ textDecoration: "none" }}>Edit Profile </Link> </Dropdown.Item>

                        <Dropdown.Item > <Link to="/ChangePassword" style={{ textDecoration: "none" }}> Change Password </Link></Dropdown.Item>
                        <Dropdown.Item onClick={Logout} style={{color:"blue"}}>  Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  }
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    </>




  );
};

export default NavbarTop;
