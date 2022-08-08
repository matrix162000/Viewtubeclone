import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import rocketImg from "../assets/sign.png";
import viewtubeImg from "../assets/viewtube.png";
import axios  from 'axios';
import {useNavigate ,Link} from 'react-router-dom';
import config from '../config'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Signin = () => {
  let navigate = useNavigate();
  // useEffect(()=>{
  //   if(localStorage.getItem("userid"))
  //   {
  //     navigate('/')
  //   }
  // },[]);
  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
  })
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={ async (values,{resetForm}) => {
       try{
        let token=document.cookie.split('=')[1];
        let data =  await axios.post(config.loginURL,values,{
          headers: {
            "Content-Type": "application/json",
            "Authorization":token
        }, withCredentials:true
        })
        
        console.log(data.data.userid);
        
        navigate('/',{
          state:{
            userid:data.data.userid,
            
          },
          
        })
        resetForm();
       }
       catch{
        toast('Incorrect Email or Password ', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
       }
        
          
      
        
      }}
    >
      {formik => (
        <>
        <div className="container-fluid">
        <div className="row">
        <Navbar  bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{marginLeft:"-5%"}} >View <img style={{height:'35px',width:"35px"}}src={viewtubeImg}/> Tube</Navbar.Brand>
          <Nav  className="me-auto">
          <Nav.Link onClick={()=>navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={()=>navigate('/About')}>About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
          <div  className="col-md-5 mt-6" style={{marginTop:"90px"}}>
        <div>
          <h1 className="my-4  font-weight-bold .display-4">Sign In</h1>
          <Form  onSubmit={formik.handleSubmit}>
            <TextField 
            label="Email"
             name="email"
             placeholder="xyz@gmail.com"
              type="email" 
              value={formik.values.email}
              onChange={formik.handleChange}
              />
            <TextField 
            label="password"
             name="password" 
             placeholder="Password"
             type="password"
             value={formik.values.password}
             onChange={formik.handleChange}
              />
              <p>in case of you forget password <Link style={{textDecoration:'none'}} to='/ResetPassword' > Forget Password </Link></p>
            <button className="btn btn-dark mt-3" type="submit">Login</button>
          </Form>
        </div>
        </div>
        <div className="col-md-7 my-auto">
        <img style={{width:"90%" ,padding:"100px 0px 0px 150px"}}className="img-fluid w-70" src={rocketImg} alt=""/>
        </div>
      </div>
    </div>
    <div style={{width:"100%", textAlign:"center",height:"40px", marginTop:"120px",backgroundColor:"darkgrey"}}><h5 style={{color:"white",paddingTop:"6px"}}>ViewTube &copy; 2022</h5></div>
    </>
      )}
    </Formik>
  )
}