import { useState } from "react";
import styles from "./UserAuth.module.scss";
import { UserRegister } from "./UserRegister/UserRegister";
import { UserLogin } from "./UserLogin/UserLogin";

export const UserAuth = () => {
  const [showView, setShowView] = useState<"start" | "login" | "register">(
    "start"
  );
  return (
    <div className={styles.mainContainer}>
      {showView === "start" && (
        <div className={styles.startView}>
          <button
            className={styles.registerBtn}
            onClick={() => setShowView("register")}
          >
            Register
          </button>
          <button
            className={styles.loginBtn}
            onClick={() => {
              setShowView("login");
            }}
          >
            Login
          </button>
        </div>
      )}
      {showView === "register" && (
        <UserRegister handleNavigateBack={() => setShowView("start")} />
      )}
      {showView === "login" && (
        <UserLogin handleNavigateBack={() => setShowView("start")} />
      )}
    </div>
  );
};
