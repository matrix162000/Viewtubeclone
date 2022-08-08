import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { TextField } from './TextField';
import * as Yup from 'yup';
import rocketImg from "../assets/sign.png";
import viewtubeImg from "../assets/viewtube.png";
import  config from '../config';
import {useNavigate ,Link} from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
  let navigate = useNavigate();
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
      secretQuestion: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Secret Question is required'),
      
  })


 
  
 
  
  return (
    
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        secretQuestion:''
      }}
      validationSchema={validate}
      onSubmit={ async (values,{resetForm}) => {


        try{
         let {data} = await axios.post(config.registerURL,values);
         
          navigate('/Signin')
          
          resetForm();
        }
      
       catch{
        toast(' Email ID already exists  ', {
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
        
           <div className=" container-fluid "> 
          
           <div className="row">
           <Navbar  bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{marginLeft:"-5%"}} >View <img style={{height:'35px',width:"35px"}}src={viewtubeImg}/> Tube</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={()=>navigate('/About')}>About</Nav.Link>
           
          </Nav>
        </Container>
      </Navbar>
             <div className="col-md-5" style={{marginTop:"-15px"}}>
              
        <div>
       
        
          <h1 className="my-3 font-weight-bold .display-2">Sign Up</h1>
          <Form style={{marginLeft: "10px"}} onSubmit={formik.handleSubmit}>
            <TextField 
            label="First Name" 
            name="firstName" 
            placeholder="First Name"
            type="text" 
            value={formik.values.firstName}
            onChange={formik.handleChange}
            />
            <TextField 
            label="Last Name"
             name="lastName"
             placeholder="Last Name"
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
               />
            <TextField
             label="Email" 
             name="email" 
             placeholder="xyz@gmail.com"
             type="email" 
             value={formik.values.email}
             onChange={formik.handleChange}
             />
            <TextField 
            label="Password"
             name="password"
             placeholder="Password"
            type="password" 
            value={formik.values.password}
            onChange={formik.handleChange}
            />
            <TextField 
            label="Confirm Password"
            placeholder="Confirm Password"
             name="confirmPassword" 
             type="password" 
             value={formik.values.confirmPassword}
             onChange={formik.handleChange}
             />
          <TextField 
            label="Secret Question" 
            name="secretQuestion" 
            placeholder="Enter Your Favorite Sport"
            type="text" 
            value={formik.values.secretQuestion}
            onChange={formik.handleChange}
            />
             <p>If already have an account <Link style={{textDecoration:'none'}} to='/Signin' > signin </Link></p>
            <button  className="btn btn-dark mt-3" type="submit" >Register</button>
          </Form>
        
        </div>
        </div>
        <div className="col-md-7 my-auto">
          <img style={{width:"90%" ,padding:"30px 0px 0px 44px"}}className="img-fluid w-70" src={rocketImg} alt=""/>
        </div>
        
      </div>
      
    </div>
    <div style={{width:"100%", textAlign:"center",height:"40px", marginTop:"31px",backgroundColor:"darkgrey"}}><h5 style={{color:"white",paddingTop:"6px"}}>ViewTube &copy; 2022</h5></div>
    </>
    
    
    
      )}
      
      
    </Formik>

  )
}