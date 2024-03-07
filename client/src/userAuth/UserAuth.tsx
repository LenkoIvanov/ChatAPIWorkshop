import { useState } from "react";
import styles from "./UserAuth.module.scss";
import { UserRegister } from "./UserRegister/UserRegister";
import { UserLogin } from "./UserLogin/UserLogin";
import {cancelRequest, getSensitiveInformationDelayed } from "../httpLayer/rest";

export const UserAuth = () => {
  const [info, setInfo] = useState<string[]>([]);
  const getUsers = async () => {
    let info: string[] = []
    try {
      info = await getSensitiveInformationDelayed();
    } catch (error) {
      console.log('ERROR -> ', error);
    }
    setInfo(info);
  }

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

      
        <div>
            Users
          <div>
            {JSON.stringify(info)}
          </div>
        </div>

        <button
          className={styles.registerBtn}
          onClick={getUsers}
        >
          Get Users
        </button>
        <button
          className={styles.registerBtn}
          onClick={cancelRequest}
        >
          Cancel request
        </button> 
      
    </div>
  );
};
