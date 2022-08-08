import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import viewtubeImg from "../assets/viewtube.png";
import changePass from "../assets/changePass.png";
import axios  from 'axios';
import  config  from '../config';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

 const ResetPassword = ()=>{
    const navigate = useNavigate();
    const validate = Yup.object({
        email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
       secretQuestion: Yup.string()
       .matches(/^[a-z\s]+$/, "Only smalll alphabets are allowed for this field ")
       .required('Secret Question is required'),
        newPassword: Yup.string()
        .min(6, 'Password must be at least 6 charaters')
        .required('New Password is required'),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Password must match')
        .required('Confirm new password is required'),
    })




    return(
        <>
  <Formik
      initialValues={{
        email:'',
        secretQuestion:'',
        newPassword:'',
        confirmNewPassword:''

      }}
      validationSchema={validate}
      onSubmit={ async (values,{resetForm}) => {


        try{
         let {data} = await axios.post(config.resetPasswordURL,values);
         toast('Password Reset Successfully ', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          resetForm();
          navigate('/Signin')
          
          
        }
      
       catch{
        toast('Incorrect Email Or Secret Answer ', {
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
          <Navbar.Brand style={{margin:"auto"}} >View <img style={{height:'35px',width:"35px"}}src={viewtubeImg}/> Tube</Navbar.Brand>
         
        </Container>
      </Navbar>
          <div  className="col-md-5 mt-6" style={{marginTop:"90px"}}>
        <div>
          <h1 style={{marginLeft: "25px"}} className="my-1  font-weight-bold .display-1">Reset Password</h1>
          <Form style={{marginLeft: "25px"}} onSubmit={formik.handleSubmit}>
         
          <TextField
             label="Email" 
             name="email" 
             placeholder="xyz@gmail.com"
             type="email" 
             value={formik.values.email}
             onChange={formik.handleChange}
             />
            <TextField 
            label="Secret Question" 
            name="secretQuestion" 
            placeholder="Enter Your Favorite Sport or Movie or Player"
            type="text"
            value={formik.values.secretQuestion}
            onChange={formik.handleChange}
            />
            

            <TextField 
            label="New Password"
            placeholder="Enter New Password"
             name="newPassword" 
             type="password" 
             value={formik.values.newPassword}
             onChange={formik.handleChange}
             />
              <TextField 
            label="Confirm New Password"
            placeholder="Confrim New Password"
             name="confirmNewPassword" 
             type="password" 
             value={formik.values.confirmNewPassword}
             onChange={formik.handleChange}
             />
             
            <button className="btn btn-dark mt-3" type="submit">Reset</button>
          </Form>
        </div>
        </div>
        <div className="col-md-7 my-auto">
        <img style={{width:"500px",minWidth:"200px" ,marginLeft: '5%'}}className="img-fluid w-70" src={changePass} alt=""/>
        </div>
      </div>
    </div>
    <div style={{width:"100%", textAlign:"center",height:"40px", marginTop:"39px",backgroundColor:"darkgrey"}}><h5 style={{color:"white",paddingTop:"6px"}}>ViewTube &copy; 2022</h5></div>
    </>
      )}
    </Formik>
        </>
    )
}
export default ResetPassword;