import React from "react";
import "../components/home.css";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Carousel from "react-bootstrap/Carousel";
import viewtubeImg from "../assets/viewtube.png";
import landingImg from "../assets/img4.jpg";
import Image from "../assets/img3.jpg";
import Img from "../assets/img.jpg";


export const Home = () => {
  let navigate = useNavigate();
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            View{" "}
            <img style={{ height: "35px", width: "35px" }} src={viewtubeImg} />{" "}
            Tube
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/Signin">Sign In</Nav.Link>
              <Nav.Link eventKey={2} href="/Signup">
                {" "}
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="carosel mt-0">
        <Carousel className="d-block  w-100 h-2px d-flex ">
          <Carousel.Item interval={3000} className="carImg">
            <img
              className="d-block  w-100 h-2px d-flex sildeImg "
              src={landingImg}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Welcome</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000} className="carImg">
            <img className="d-block w-100 " src={Image} alt="Second slide" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000} className="carImg">
            <img className="d-block w-100 " src={Img} alt="Third slide" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>


      <div className="Product-description">
        <div className="description-heading">
          <h1>Product Description</h1>
        </div>
        <div className="description-details">
          <div class="detail">
            <h2>Most Viewed</h2>
            <p>
              Do you wonder why we use exactly 992px and 600px? They are what we
              call "typical breakpoints" for devices. You can read more about
              typical breakpoints in our Responsive Web Design Tutorial.
            </p>
          </div>
          <div class="detail">
            <h2>Search</h2>
            <p>
              Do you wonder why we use exactly 992px and 600px? They are what we
              call "typical breakpoints" for devices. You can read more about
              typical breakpoints in our Responsive Web Design Tutorial.
            </p>
          </div>
          <div class="detail">
            <h2>Favourite</h2>
            <p>
              Do you wonder why we use exactly 992px and 600px? They are what we
              call "typical breakpoints" for devices. You can read more about
              typical breakpoints in our Responsive Web Design Tutorial.
            </p>
          </div>
        </div>
      </div>

    </>
  );
};
