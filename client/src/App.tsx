import "./App.css";
import { cancelRequest } from "./httpLayer/rest";
import { Chat } from "./Chat/Chat";
import { UserAuth } from "./userAuth/UserAuth";
import { authTokenKey } from "./utils/constants";
import { useState } from "react";

function App() {
  let authenticationToken = sessionStorage.getItem(authTokenKey);
  const [showChat, setShowChat] = useState<boolean>(false);

  const logOut = () => {
    authenticationToken = null;
    setShowChat(false);
    cancelRequest();
    sessionStorage.removeItem(authTokenKey);
  }

  const switchView = () => {
    if(showChat) {
      setShowChat(false);
    } else {
      if (authenticationToken) {
        setShowChat(true);
      }
    }
  }

  return (
    <div className="mainContainer">
      <button
          style={{position: "absolute", top: "2rem", right: "2rem"}}
          onClick={logOut}
      >
          Log out
      </button>
      <button
          style={{position: "absolute", top: "2rem", right: "6rem"}}
          onClick={switchView}
      >
          { showChat ? 'Login' : 'Chat'}
      </button>
      {showChat ? <Chat authToken={authenticationToken!}/> : <UserAuth />}
    </div>
  );
}

export default App;
