import "./App.css";
import { UserLogin } from "./userAuth/UserLogin/UserLogin";
import { UserRegister } from "./userAuth/UserRegister/UserRegister";

function App() {
  return (
    <div className="mainContainer">
      <UserRegister />
      <UserLogin />
    </div>
  );
}

export default App;
