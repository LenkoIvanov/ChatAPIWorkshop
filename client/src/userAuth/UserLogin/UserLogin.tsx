import styles from "./UserLogin.module.scss";

interface UserLoginProps {
  handleNavigateBack: () => void;
}

export const UserLogin = (props: UserLoginProps) => {
  const { handleNavigateBack } = props;

  return (
    <form className={styles.loginForm}>
      <h3>Login with your credentials: </h3>
      <label>Username</label>
      <input type="text"></input>
      <label>Password</label>
      <input type="text"></input>
      <div className={styles.btnContainer}>
        <button onClick={handleNavigateBack} className={styles.backBtn}>
          Back
        </button>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};
