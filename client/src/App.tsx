import "./App.css";
import { Chat } from "./Chat/Chat";
import { UserAuth } from "./userAuth/UserAuth";
import { authTokenKey } from "./utils/constants";

function App() {
  const authenticationToken = sessionStorage.getItem(authTokenKey);

  return (
    <div className="mainContainer">
      {authenticationToken ? <Chat /> : <UserAuth />}
    </div>
  );
}

export default App;
