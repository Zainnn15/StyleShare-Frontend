import NavbarIn from "../components/NavbarIn";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";


export default function Profile() {
    const {user} = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        if(!profile) {
            fetch('/profile').then((res) => res.json()).then((data) => {
                setProfile(data);
            })
        }
    }, [])


  return (
    <div>
        <NavbarIn />
        <h1>Profile</h1>
        <h2>Welcome, {user.name}</h2>
        <h3>Email: {user.email}</h3>
        
        </div>
  )
}
