/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { UserContext } from "../../context/userContext";
import ScreenHeaderIn from "../components/common/ScreenHeaderIn";
import defaultProfile from "../assets/images/profile_default.jpg"
import '../styles/main.scss';
import { changeTitle } from '../constants/functions/inputHandlers';
import Card from '../components/common/Card';
import CircleBtn from '../components/common/CircleBtn';
// const mongoose = require('mongoose'); 

//delete
import front from '../assets/images/front.png';
import back from '../assets/images/back.png';
import Circle from '../components/common/Circle';
import { colorStatus } from '../constants/data/lists';

export default function Group() {
    // get members from group number
    // get profile pic or default, name, and garment

    //get user info
    const {user} = useContext(UserContext);

    ////dummy values////
    user.group = 3;

    //get users in the group
    let members = [
        {
            id: 100,
            username: "aHaley",
            garment: {id:1000, status:"available", 
                location:"StoreA", numWear:5, numWash:5, img:front,
                front:front, back:back
            }
        },
        {
            id: 101,
            username: "bobaboy",
            garment: {id:1001, status:"removed", 
                location:"StoreB", numWear:8, numWash:4, img:front,
                front:front, back:back
            }
        },
        {
            id: 102,
            username: "mysteria",
            garment: {id:1002, status:"booked", 
                location:"StoreC", numWear:10, numWash:8, img:front,
                front:front, back:back
            }
        },
        {
            id:103,
            username: "TxabcxZ",
            garment: {id:1003, status:"using", 
                location:"StoreD", numWear:2, numWash:2, img:front,
                front:front, back:back
            }
        },
        {
            id: 104,
            username: "goldenPotato",
            garment: {id:1004, status:"available", 
                location:"StoreA", numWear:3, numWash:3, img:front,
                front:front, back:back
            }
        },
        {
            id:105,
            username: "johnsmith",
            garment: {id:1005, status:"available", 
                location:"StoreC", numWear:4, numWash:2, img:front,
                front:front, back:back
            }
        }
    ]
    const [mem, setMem] = useState(members);
    const testWidth = "18em";
    const testHeight = "22em";
    ///////////////////////////

    function getMember(idNum) {
        let member = null;
        for(let i=0; i < members.length; i++) {
            if(members[i].id === idNum) {
                member = members[i].garment;
                break;
            }
        }
        return member;
    }

    function showGarmentSummary(idNum) {
        let member = getMember(idNum);
        return (
            <div>
                <div>
                    <label className='text-b'>Store: </label>
                    <label className='tab'></label>
                    <label>{member.location}</label>
                </div>
                <div>
                    <label className='text-b'>Times worn: </label>
                    <label className='tab'></label>
                    <label>{member.numWear}</label>
                </div>
                <div>
                    <label className='text-b'>Times washed: </label>
                    <label className='tab'></label>
                    <label>{member.numWash}</label>
                </div>
            </div>
        )
    }

    function handleClickImg(idNum, index) {
        let member = getMember(idNum);
        if(!member) {
            return;
        }
        let temp = mem;
        if(temp[index].garment.img === temp[index].garment.front) {
            temp[index].garment.img = temp[index].garment.back;
        }
        else {
            temp[index].garment.img = temp[index].garment.front;
        }
        setMem([
            ...temp
        ]);
    }

    changeTitle("Group");
    return(
        <div>
            <ScreenHeaderIn />
            <div className="container main">
                <div>
                    <label className="container-title">Group {user.group}</label>
                    <hr/>
                </div>
                <div className='container-measure-group'>
                {
                    mem.map((m, index)=>{
                    return(
                    <div key={"card_"+index}>
                        <Card 
                            imgUrl={m.garment.img}
                            title={
                                <div className='container-row gap-s'>
                                    <CircleBtn
                                    iconUrl={defaultProfile} 
                                    className="button-info" 
                                    width="2em" 
                                    />
                                    {m.username}
                                </div>
                            }
                            status={
                                <div className='container-row gap-s'>
                                    <Circle
                                    colorStart="white"
                                    colorStop={colorStatus[m.garment.status]}
                                    size="0.5em" 
                                    />
                                    {m.garment.status}
                                </div>
                            }
                            description={showGarmentSummary(m.id)}
                            btnText={"View"}
                            width={testWidth}
                            height={testHeight}
                            handleImgPress={()=>handleClickImg(m.id, index)}
                        />
                    </div>
                    )})
                }    
                
                    
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

// function PrintUsers({users}) {
//     return(
//         <div className='container'>
//             {users.map((user, index) => (
//                 <div key={"member_"+index} className='container-row'> 
//                 <>
//                     <div className='container-col'>
//                         {user.name}
//                     </div>
//                     <div className='container-col'>
//                         <img src={user.profilePicture || defaultProfile} height={50} alt={`${user.name} profile`} />
//                     </div>
//                     <div className='container-col'>
//                         {user.garmentPhoto && (
//                         <>
//                             <img src={user.garmentPhoto} alt={`Garment owned by ${user.name}`}></img>
//                         </>
//                         )}
//                         {!user.garmentPhoto && (
//                             <p>
//                                 {user.name} has not entered garment details yet
//                             </p>
//                         )}
//                     </div>
//                 </>
//                 </div>        
//             ))}
//         </div>
//     )
// }