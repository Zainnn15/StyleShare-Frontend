/* eslint-disable react/prop-types */
//import { useState } from 'react';
import ScreenHeader from "../components/common/ScreenHeader";
import defaultProfile from "../assets/images/profile_default.jpg"
import '../styles/main.scss';
import { changeTitle } from '../constants/functions/inputHandlers';
// const mongoose = require('mongoose'); 

export default function Group({number}) {
    // get members from group number
    // get profile pic or default, name, and garment

    let users = [
        {
            name: "Amanda"
        },
        {
            name: "Joe"
        },
        {
            name: "Bob"
        },
        {
            name: "Sally"
        }
    ]

    changeTitle("Group");
    return(
        <div>
            <ScreenHeader />
            <div className="container main">
                <div>
                    <label className="container-title">Group {number || "#"}</label>
                    <hr/>
                    <PrintUsers users={users}/>

                    {/* {number && (
                        <>
                            <label className="container-title">Group {number || "#"}</label>
                            <printUsers users={users}/>
                            <hr/>
                        </>
                    )}

                    {!number && (
                        <>
                            <label className="container-title">You must join a group before viewing this page</label>
                        </>                        
                    )} */}
                </div>
            </div>
        </div>
    )
}

function PrintUsers({users}) {
    return(
        <div className='container'>
            {users.map((user, index) => (
                <div key={"member_"+index} className='container-row'> 
                <>
                    <div className='container-col'>
                        {user.name}
                    </div>
                    <div className='container-col'>
                        <img src={user.profilePicture || defaultProfile} height={50} alt={`${user.name} profile`} />
                    </div>
                    <div className='container-col'>
                        {user.garmentPhoto && (
                        <>
                            <img src={user.garmentPhoto} alt={`Garment owned by ${user.name}`}></img>
                        </>
                        )}
                        {!user.garmentPhoto && (
                            <p>
                                {user.name} has not entered garment details yet
                            </p>
                        )}
                    </div>
                </>
                </div>        
            ))}
        </div>
    )
}