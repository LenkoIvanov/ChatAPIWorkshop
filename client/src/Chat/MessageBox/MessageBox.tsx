import { format } from 'date-fns';
import styles from './MessageBox.module.scss';

interface MessageProps {
  messageTxt: string;
  sentDate: Date;
  author: string;
}
export const MessageBox = (props: MessageProps) => {
  const { messageTxt, sentDate, author } = props;
  return (
    <div className={styles.messageContainer}>
      {messageTxt}
      <div className={styles.dateSection}>
        <span>{author}</span>
        {format(sentDate, 'HH:mm')}
      </div>
    </div>
  );
};
