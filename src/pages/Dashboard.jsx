import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import ScreenHeaderIn from "../components/common/ScreenHeaderIn";
import { changeTitle } from "../constants/functions/inputHandlers";

export default function Dashboard() {
  const { user, loading } = useContext(UserContext);
  
  // This will change the document's title every time the component renders
  changeTitle("Home");
  
  // Handle loading state
  if (loading) {
    return <div>Loading...</div>; // You can replace this with any loading indicator you prefer
  }

  // Now that we're sure the loading process is complete, we handle the user's presence
  return (
      <div>
          <ScreenHeaderIn />
          <div className="container main">
              {/* Ensure user exists before trying to access its properties */}
              <h1>Welcome, {user ? user.name : "Guest"}</h1>
          </div>
      </div>
  );
}