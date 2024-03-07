import { useState } from 'react';
import styles from './AuthView.module.scss';
import { cancelRequest, getUsers } from '../../httpLayer/rest';
import { authTokenKey } from '../../utils/constants';

export const AuthView = () => {
  const [users, setUsers] = useState<string[]>([]); // ffix this in the backend

  const handleGetUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  const handleSignOut = () => {
    cancelRequest();
    sessionStorage.removeItem(authTokenKey);
    window.location.reload();
  };

  return (
    <div className={styles.authView}>
      <div className={styles.btnContainer}>
        <button onClick={handleGetUsers} className={styles.usersBtn}>
          Get Users
        </button>
        <button onClick={handleSignOut} className={styles.signOutBtn}>
          Sign Out
        </button>
      </div>
      <section>
        <div>User section:</div>
        <ul>
          {users.map((user) => {
            return <li key={`${user.username}`}>{user.username}</li>;
          })}
        </ul>
      </section>
    </div>
  );
};
