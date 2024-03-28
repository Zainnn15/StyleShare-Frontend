/* eslint-disable react/prop-types */
import '../../styles/main.scss';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { GarmentContext } from "../../../context/garmentContext.jsx";
import { UserContext } from "../../../context/userContext.jsx";
import logo from '../../assets/icons/logo192.png';
import menu from '../../assets/icons/menu.png';
import profile from '../../assets/images/profile_default.jpg';
import { useNavigate } from 'react-router-dom';

import CircleBtn from "./CircleBtn.jsx";
import { getImageFromURL } from '../../constants/functions/valueHandlers.js';

const ScreenHeader = ({isLogin=true, linkName="Login"}) => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const {garment} = useContext(GarmentContext);
      // logout function
      const handleLogout = async () => {
        try {
            await fetch('https://garment-backend.onrender.com/logout', {
                method: 'GET',
                credentials: 'include', // Include credentials for cookies to be sent
            });

            // Clear any local state or user information in your frontend
            setUser(null); // Assuming setUser is the function to update the user context

            // Use navigate to go to the home page instead of window.location to keep SPA behavior
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    function openProfileDropdown() {
        let e_dropdown = document.getElementById("profile_dropdown");
        if(!e_dropdown) {
            return;
        }

        if(e_dropdown.classList.contains("pop-active")) {
            e_dropdown.classList.toggle("pop-active", false);
        }
        else {
            //close other menus
            const menus = document.querySelectorAll(".pop-active");
            for(let menu of menus) {
                menu.classList.toggle("pop-active", false);
            }
            e_dropdown.classList.toggle("pop-active", true);
        }
    }

    function openMenuDropdown() {
        let e_dropdown = document.getElementById("menu_dropdown");
        if(!e_dropdown) {
            return;
        }

        if(e_dropdown.classList.contains("pop-active")) {
            e_dropdown.classList.toggle("pop-active", false);
        }
        else {
            //close other menus
            const menus = document.querySelectorAll(".pop-active");
            for(let menu of menus) {
                menu.classList.toggle("pop-active", false);
            }
            e_dropdown.classList.toggle("pop-active", true);
        }
    }

    window.addEventListener('click', ({target}) => {
        const popup = target.closest('.popup');

        if(popup == null) {
            let menus = document.querySelectorAll(".pop-active");
            for(let menu of menus) {
                menu.classList.toggle("pop-active", false);
            }
        }
    });

    return(
        <div>
            <div className="container-header">
                <div className="container-row">
                    <Link className="container-header-button" to="/dashboard">
                        <CircleBtn iconUrl={logo} className={"button-header"} width={"100%"} />
                    </Link>
                    {  
                        isLogin &&
                        <div className="container-header-button popup">
                        <CircleBtn iconUrl={menu} className={"button-header"} width={"80%"} 
                            handlePress={openMenuDropdown}
                        />
                        </div>
                    }
                </div>
                {
                    isLogin &&
                    <div className="container-header-button popup">
                    <CircleBtn iconUrl={garment ? getImageFromURL(garment.fileFront) : profile} 
                        className={"button-header"} width={"35px"} height={"35px"}
                        handlePress={openProfileDropdown}
                    />
                    </div>
                }
                {
                    !isLogin &&
                    <Link to={`/${linkName.toLowerCase()}`} >
                        <button className="button-header-link">
                            {linkName}
                        </button>
                    </Link>
                }
            </div>
            {
                isLogin && (
                    <div>
                        <div className="container-header-profile" id="profile_dropdown">
                            <Link to="/userprofile">Profile</Link>
                            {/* <Link to="/garment-care">Settings</Link> */}
                            <Link to="/group">Group</Link>
                            <div onClick={handleLogout}>
                                <label>Sign Out</label>
                            </div>
                        </div>
                        <div className="container-header-menu" id="menu_dropdown">
                            <Link to="/dashboard">Home</Link>
                            <Link to="/garment-details">Add Garment</Link>
                            <Link to="/garment-measure">Add Measurement</Link>
                            <Link to="/garment-care">Garment Care</Link>
                            <Link to="/garment-exchange">Exchange Garment</Link>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default ScreenHeader;