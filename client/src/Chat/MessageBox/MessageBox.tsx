import { format } from 'date-fns';
import styles from './MessageBox.module.scss';

interface MessageProps {
  messageTxt: string;
  sentDate: Date;
}
export const MessageBox = (props: MessageProps) => {
  const { messageTxt, sentDate } = props;
  return (
    <div className={styles.messageContainer}>
      {messageTxt}
      <div className={styles.dateSection}>{format(sentDate, 'HH:mm')}</div>
    </div>
  );
};
