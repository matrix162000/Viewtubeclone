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

 const ChangePassword = ()=>{
    
    const validate = Yup.object({
     
      oldPassword: Yup.string()
        .min(6, 'Password must be at least 6 charaters')
        .required('Password is required'),
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
        oldPassword: '',
        newPassword:'',
        confirmNewPassword:''
      }}
      validationSchema={validate}
      onSubmit={ async (values,{resetForm}) => {
       try{
        let token = document.cookie.split('=')[1];
        await axios.post(config.changePasswordURL,values,{
          headers: {
            "Content-Type": "application/json",
            "Authorization":token
        }, withCredentials:true
        });
        toast(' Password  Updated Successfully', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
        resetForm();
        
       }
       catch{
        toast('Please Check Your Current Password ', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
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
          <h1 style={{marginLeft: "25px"}} className="my-1  font-weight-bold .display-1">Change Password</h1>
          <Form style={{marginLeft: "25px"}} onSubmit={formik.handleSubmit}>
         
          
            <TextField 
            label="Old Password"
             name="oldPassword" 
             placeholder="Old Password"
             type="password"
             value={formik.values.oldPassword}
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
             
            <button className="btn btn-dark mt-3" type="submit">Change</button>
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
export default ChangePassword;