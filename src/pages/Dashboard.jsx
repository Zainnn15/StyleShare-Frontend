import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import ScreenHeaderIn from "../components/common/ScreenHeaderIn";
import { changeTitle } from "../constants/functions/inputHandlers";

export default function Dashboard() {
  const {user} = useContext(UserContext);
  changeTitle("Home");
  return (
      <div>
            <ScreenHeaderIn />
          <div className="container main">
              <h1>Welcome, {user.name}</h1>
          </div>
      </div>
  );
}
