/* eslint-disable react/prop-types */
import '../../styles/main.scss';
import { Link } from "react-router-dom";

import logo from '../../assets/icons/logo_white.png';
import menu from '../../assets/icons/menu.png';
import profile from '../../assets/images/profile_default.jpg';

import CircleBtn from "./CircleBtn.jsx";

const ScreenHeader = ({isLogin=true, linkName="Login"}) => {

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
                    <Link className="container-header-button" to="/">
                        <CircleBtn iconUrl={logo} className={"button-header"} width={"40px"} height={"50px"} />
                    </Link>
                    {  
                        isLogin &&
                        <div className="container-header-button popup">
                        <CircleBtn iconUrl={menu} className={"button-header"} width={"30px"} height={"30px"} 
                            handlePress={openMenuDropdown}
                        />
                        </div>
                    }
                </div>
                {
                    isLogin &&
                    <div className="container-header-button popup">
                    <CircleBtn iconUrl={profile} className={"button-header"} width={"30px"} height={"30px"} 
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
                            <Link to="/login">Profile</Link>
                            {/* <Link to="/settings">Settings</Link> */}
                            <Link to="/login">Group</Link>
                            <Link to ="/login">Login</Link>
                            <Link to ="/register">Sign up</Link>
                           
                         
                        </div>
                        <div className="container-header-menu" id="menu_dropdown">
                            <Link to="/">Home</Link>
                            <Link to="/login">Add Garment</Link>
                            <Link to="/login">Add Measurement</Link>
                            <Link to="/login">Garment Care</Link>
                            <Link to="/login">Exchange Garment</Link>
                            <Link to="/login">Reserve a Garment</Link>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default ScreenHeader;