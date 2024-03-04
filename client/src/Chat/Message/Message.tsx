import { jwtDecode } from "jwt-decode";
import { currentUserColor, getRandomNeonColor } from "../../utils/chatColors";
import { authTokenKey } from "../../utils/constants";
import { ChatBubble } from "../ChatBubble/ChatBubble";
import { MessageBox } from "../MessageBox/MessageBox";
import styles from "./Message.module.scss";
import { JWTToken } from "../../utils/interfaces";

interface MessageProps {
  messageText: string;
  sender: string;
  sentDate: Date;
}

export const Message = (props: MessageProps) => {
  const { messageText, sender, sentDate } = props;

  const isSenderLoggedIn = (): boolean => {
    const storedToken = sessionStorage.getItem(authTokenKey);
    if (storedToken) {
      const decodedToken = jwtDecode<JWTToken>(storedToken);
      return decodedToken.username === sender ? true : false;
    }
    return false; //fallback
  };

  const getChatBubbleColor = (): string => {
    return isSenderLoggedIn() ? currentUserColor : getRandomNeonColor();
  };

  return (
    <div
      className={`${styles.message} ${
        isSenderLoggedIn() ? "" : styles.differentSender
      }`}
    >
      <MessageBox messageTxt={messageText} sentDate={sentDate} />
      <ChatBubble color={getChatBubbleColor()} name={sender} />
    </div>
  );
};
