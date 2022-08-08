//eslint-disable-next-line 
import './App.css';
import { Signup } from './components/Signup';
import {Signin} from './components/Signin';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {Home} from "./components/Home";
import  Landing  from './components/landing';
import NavbarTop from './components/NavbarTop';
import ChangePassword from './components/ChangePassword';
import UpdateProfile from './components/UpdateProfile';
import GetProfile from './components/GetProfile';
import Test from "./components/Test"
import Favourite from "./components/Favourite"
import Entertainment from './components/Entertainment.js';
import Music from './components/Music';
import Sports from './components/Sports';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './components/ResetPassword';


function App() {
  return (
       <>
      <ToastContainer/>
      
      
      <Router>
    
      <Routes>
        <Route exact path="/" element={<Landing/>} />
          <Route exact path="/Signup" element={<Signup/>} />
          <Route exact path="/Signin" element={<Signin/>} />
          <Route exact path="/about" element={<Home/>} />
          <Route exact path="/ChangePassword" element={<ChangePassword/>} />
          <Route exact path="/ResetPassword" element={<ResetPassword/>} />
          <Route exact path="/UpdateProfile" element={<UpdateProfile/>} />
          <Route exact path="/GetProfile" element={<GetProfile/>} />
          <Route exact path="/favourite" element={<Favourite/>} />
          <Route path="/video/:id" element={<Test />} />
          <Route exact path="/entertainment" element={<Entertainment />} />
          <Route exact path="/music" element={<Music />} />
          <Route exact path="/sports" element={<Sports />} />
        </Routes>
       
        
    </Router>
    </>
    
  );
}

export default App;
