import "./App.css";
import { UserAuth } from "./userAuth/UserAuth";
import { authTokenKey } from "./utils/constants";

function App() {
  const authenticationToken = sessionStorage.getItem(authTokenKey);

  return (
    <div className="mainContainer">
      {authenticationToken ? <div>ChatApp</div> : <UserAuth />}
    </div>
  );
}

export default App;
