import styles from "./UserRegister.module.scss";

export const UserRegister = () => {
  return (
    <form className={styles.registrationForm}>
      <h3>Register a new user: </h3>
      <label>Username</label>
      <input type="text"></input>
      <label>Password</label>
      <input type="text"></input>
      <button type="submit">Register</button>
    </form>
  );
};
