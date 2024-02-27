import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import NavbarIn from "../components/NavbarIn";

export default function Dashboard() {
    const {user} = useContext(UserContext);
  return (
    <div>
        <NavbarIn />
        <h1>Dashboard</h1>
        <h2>Welcome, {user.name}</h2>
    </div>
  )
}
