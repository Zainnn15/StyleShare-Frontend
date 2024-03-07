import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import ScreenHeader from "../components/common/ScreenHeader";
import { changeTitle } from "../constants/functions/inputHandlers";

export default function Dashboard() {
  const {user} = useContext(UserContext);
  changeTitle("Home");
  return (
      <div>
          <ScreenHeader />
          <div className="container main">
              <h1>Welcome, {user.name}</h1>
          </div>
      </div>
  );
}
