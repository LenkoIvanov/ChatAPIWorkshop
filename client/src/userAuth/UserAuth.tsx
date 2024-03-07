import styles from './UserAuth.module.scss';
import { NonAuthView } from './NonAuthView/NonAuthView';
import { AuthView } from './AuthView/AuthView';

interface UserAuthProps {
  authToken: string;
}

export const UserAuth = (props: UserAuthProps) => {
  const { authToken } = props;

  return <div className={styles.mainContainer}>{authToken.length > 0 ? <AuthView /> : <NonAuthView />}</div>;
};
