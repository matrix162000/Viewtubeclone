import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import viewtubeImg from "../assets/viewtube.png";
import changePass from "../assets/changePass.png";
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
    const navigate = useNavigate();

    const validate = Yup.object({

        firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),

    })
    return (
        <>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: ''
                }}
                validationSchema={validate}
                onSubmit={async (values, { resetForm }) => {
                    try {
                        let token = document.cookie.split('=')[1];
                        await axios.post(config.editProfileURL, values, {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": token
                            }, withCredentials: true
                        });
                        toast('Profile Update Successfully ', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            })
                        resetForm();
                        navigate('/GetProfile')

                    }
                    catch {
                        toast('User Not Found ', {
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
                                <Navbar bg="dark" variant="dark">
                                    <Container>
                                        <Navbar.Brand style={{ margin: "auto" }} >View <img style={{ height: '35px', width: "35px" }} src={viewtubeImg} /> Tube</Navbar.Brand>

                                    </Container>
                                </Navbar>
                                <div className="col-md-5 mt-6" style={{ marginTop: "90px" }}>
                                    <div>
                                        <h1 style={{ marginLeft: "25px" }} className="my-1  font-weight-bold .display-1">Update Profile</h1>
                                        <Form style={{ marginLeft: "25px" }} onSubmit={formik.handleSubmit}>


                                            <TextField
                                                label="First Name"
                                                name="firstName"
                                                placeholder="New First Name"
                                                type="text"
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                            />

                                            <TextField
                                                label="Last Name"
                                                placeholder="New Last Name"
                                                name="lastName"
                                                type="text" value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                            />

                                            <button className="btn btn-dark mt-3" type="submit">Update</button>
                                        </Form>
                                    </div>
                                </div>
                                <div className="col-md-7 my-auto">
                                    <img style={{ width: "500px", minWidth: "200px", marginLeft: '5%' }} className="img-fluid w-70" src={changePass} alt="profile img demo" />
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "100%", textAlign: "center", height: "40px", marginTop: "39px", backgroundColor: "darkgrey" }}><h5 style={{ color: "white", paddingTop: "6px" }}>ViewTube &copy; 2022</h5></div>
                    </>
                )}
            </Formik>
        </>
    )
}
export default UpdateProfile;