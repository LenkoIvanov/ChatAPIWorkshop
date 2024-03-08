import { useState } from 'react';
import styles from './AuthView.module.scss';
import { Author, cancelRequest, getSensitiveInformationDelayed, getUsers } from '../../httpLayer/rest';
import { authTokenKey } from '../../utils/constants';

export const AuthView = () => {
  const [users, setUsers] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSlowGetUsers = async () => {
    setLoading(true);
    const users = await getSensitiveInformationDelayed();
    setUsers(users);
    setLoading(false);
  };

  const handleFastGetUsers = async () => {
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
      {loading ? (
        <>
          <div className={styles.backdrop}></div>
          <div className={styles.overlay}>
            <span>This will take quite a while... If you want You can stop the request</span>
            <button onClick={cancelRequest}>Cancel request</button>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className={styles.btnContainer}>
        <button onClick={handleFastGetUsers} className={styles.usersBtn}>
          Get Users
        </button>
        <button onClick={handleSignOut} className={styles.signOutBtn}>
          Sign Out
        </button>
      </div>
      <section>
        <div>User section:</div>
        <ul>
          {users.map((user: Author) => {
            return <li key={`${user.username}`}>{user.username}</li>;
          })}
        </ul>
      </section>
    </div>
  );
};
