import styles from "./UserRegister.module.scss";

interface UserRegisterProps {
  handleNavigateBack: () => void;
}

export const UserRegister = (props: UserRegisterProps) => {
  const { handleNavigateBack } = props;

  return (
    <form className={styles.registrationForm}>
      <h3>Register a new user: </h3>
      <label>Username</label>
      <input type="text"></input>
      <label>Password</label>
      <input type="text"></input>
      <div className={styles.btnContainer}>
        <button onClick={handleNavigateBack} className={styles.backBtn}>
          Back
        </button>
        <button type="submit">Register</button>
      </div>
    </form>
  );
};
