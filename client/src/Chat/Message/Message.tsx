import { ChatBubble } from "../ChatBubble/ChatBubble";
import { MessageBox } from "../MessageBox/MessageBox";
import styles from "./Message.module.scss";

interface MessageProps {
  messageText: string;
  sender: string;
  sentDate: Date;
}

export const Message = (props: MessageProps) => {
  const { messageText, sender, sentDate } = props;
  return (
    <div className={styles.message}>
      <MessageBox messageTxt={messageText} sentDate={sentDate} />
      <ChatBubble color="red" name={sender} />
    </div>
  );
};
