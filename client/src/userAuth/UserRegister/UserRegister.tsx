import { useRef } from "react";
import styles from "./UserRegister.module.scss";
import { createNewUser } from "../../httpLayer/rest";

interface UserRegisterProps {
  handleNavigateBack: () => void;
}

export const UserRegister = (props: UserRegisterProps) => {
  const { handleNavigateBack } = props;
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleUserRegistration = async (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    ev.preventDefault();
    const resp = await createNewUser(
      String(usernameRef.current?.value),
      String(passwordRef.current?.value)
    );
    if (resp === 200) {
      window.alert("Succesful registration!");
      handleNavigateBack();
    } else {
      window.alert("An error has occured! Try again later");
    }
  };

  return (
    <form className={styles.registrationForm}>
      <h3>Register a new user: </h3>
      <label>Username</label>
      <input ref={usernameRef} type="text"></input>
      <label>Password</label>
      <input ref={passwordRef} type="text"></input>
      <div className={styles.btnContainer}>
        <button onClick={handleNavigateBack} className={styles.backBtn}>
          Back
        </button>
        <button onClick={(ev) => handleUserRegistration(ev)} type="submit">
          Register
        </button>
      </div>
    </form>
  );
};
