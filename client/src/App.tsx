import './App.css';
import { Chat } from './Chat/Chat';
import { UserAuth } from './userAuth/UserAuth';
import { authTokenKey } from './utils/constants';
import { useState } from 'react';

function App() {
  const authenticationToken = sessionStorage.getItem(authTokenKey);
  const [showChat, setShowChat] = useState<boolean>(false);

  const switchView = () => {
    if (showChat) {
      setShowChat(false);
    } else {
      if (authenticationToken) {
        setShowChat(true);
      }
    }
  };

  return (
    <div className="mainContainer">
      <button style={{ position: 'absolute', top: '2rem', right: '10rem' }} onClick={switchView}>
        {showChat ? 'Login' : 'Chat'}
      </button>
      {showChat ? <Chat authToken={authenticationToken!} /> : <UserAuth authToken={authenticationToken!} />}
    </div>
  );
}

export default App;
