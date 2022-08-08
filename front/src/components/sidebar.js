import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InfoIcon from '@mui/icons-material/Info';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SideBar = () => {
    const navigate = useNavigate();
    const [loggedIn, setLoging] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("userid")) {
            setLoging(true);
        }
    },[]);
    function LoggedIn(){
        if(!localStorage.getItem("userid")){
            toast('Please Login First To See Favorite Video ', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
        }
    }
    function ToHome() {
        navigate('/')
    }
    return (<>
        <div className="sidebar">

            <nav className="sidenav">
                <ul>
                    <li>
                        {/* <button onClick={()=>{
                    navigate("/landing")
                   }}>Home</button> */}
                     <Link to='/'>  <HomeIcon/>  Home</Link>

                    </li>
                    <li>
                        {
                            loggedIn ? <NavLink to="/favourite"><FavoriteBorderIcon/>Favourite</NavLink> : <Link to="/"> <FavoriteBorderIcon/>  <span onClick={LoggedIn}>Favorite</span></Link>

                        }

                    </li>
                    <li>
                        <NavLink to="/about"><InfoIcon/> About</NavLink>

                    </li>

                    <li>
                        <NavLink to="/entertainment"> <OndemandVideoIcon/>  Entertain</NavLink>

                    </li>
                    <li>
                        <NavLink to="/music"> <LibraryMusicIcon/> Music</NavLink>

                    </li>
                    <li>
                        <NavLink to="/sports"> <SportsEsportsIcon/> Sports</NavLink>

                    </li>
                </ul>
            </nav>
        </div>
    </>
    );
}
export default SideBar;