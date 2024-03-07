import { useRef } from "react";
import styles from "./UserLogin.module.scss";
import { userLogin } from "../../httpLayer/rest";
import { authTokenKey } from "../../utils/constants";

interface UserLoginProps {
  handleNavigateBack: () => void;
}

export const UserLogin = (props: UserLoginProps) => {
  const { handleNavigateBack } = props;
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleUserLogin = async (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    ev.preventDefault();
    const token = await userLogin(
      String(usernameRef.current?.value),
      String(passwordRef.current?.value)
    );
    if (token) {
      window.alert("Succesful login!");
      sessionStorage.setItem(authTokenKey, token);
      window.location.reload();
    }
    // } else {
    //   window.alert("An error has occured! Try again later");
    // }
  };

  return (
    <form className={styles.loginForm}>
      <h3>Login with your credentials: </h3>
      <label>Username</label>
      <input ref={usernameRef} type="text"></input>
      <label>Password</label>
      <input ref={passwordRef} type="text"></input>
      <div className={styles.btnContainer}>
        <button onClick={handleNavigateBack} className={styles.backBtn}>
          Back
        </button>
        <button onClick={handleUserLogin} type="submit">
          Login
        </button>
      </div>
    </form>
  );
};
