import styles from "./UserLogin.module.scss";

export const UserLogin = () => {
  return (
    <form className={styles.loginForm}>
      <h3>Login with your credentials: </h3>
      <label>Username</label>
      <input type="text"></input>
      <label>Password</label>
      <input type="text"></input>
      <button type="submit">Login</button>
    </form>
  );
};
