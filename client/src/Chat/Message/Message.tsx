import { jwtDecode } from "jwt-decode";
import { authTokenKey } from "../../utils/constants";
import { ChatBubble } from "../ChatBubble/ChatBubble";
import { MessageBox } from "../MessageBox/MessageBox";
import styles from "./Message.module.scss";
import { AuthorInfo, JWTToken } from "../../utils/interfaces";

interface MessageProps {
  messageText: string;
  sender: AuthorInfo;
  sentDate: Date;
}

export const Message = (props: MessageProps) => {
  const { messageText, sender, sentDate } = props;

  const isSenderLoggedIn = (): boolean => {
    const storedToken = sessionStorage.getItem(authTokenKey);
    if (storedToken) {
      const decodedToken = jwtDecode<JWTToken>(storedToken);
      return decodedToken.username === sender.username ? true : false;
    }
    return false; //fallback
  };

  return (
    <div
      className={`${styles.message} ${
        isSenderLoggedIn() ? "" : styles.differentSender
      }`}
    >
      <MessageBox messageTxt={messageText} sentDate={sentDate} />
      <ChatBubble color={sender.color} name={sender.username} />
    </div>
  );
};
