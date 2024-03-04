import { useRef } from "react";
import { Message } from "./Message/Message";
import styles from "./Chat.module.scss";

export const Chat = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesWindow}>
        <Message
          messageText="sfsadfdsafdsfdsfsdfsd fsdf sdf sdf sdf sdf sdfsdfsdf sdf sdf sdfsdf sdf"
          sender="lenko"
          sentDate={new Date()}
        />
        <Message
          messageText="sfsadfdsafdsfdsfsdfsd fsdf sdf sdf sdf sdf sdfsdfsdf sdf sdf sdfsdf sdf"
          sender="rero ivanov"
          sentDate={new Date()}
        />
        <Message
          messageText="sfsadfdsafdsfdsfsdfsd fsdf sdf sdf sdf sdf sdfsdfsdf sdf sdf sdfsdf sdf"
          sender="rero lelo"
          sentDate={new Date()}
        />
        <Message
          messageText="sfsadfdsafdsfdsfsdfsd fsdf sdf sdf sdf sdf sdfsdfsdf sdf sdf sdfsdf sdf"
          sender="rero lelo"
          sentDate={new Date()}
        />
      </div>
      <div className={styles.sendMessage}>
        <form>
          <input ref={inputRef} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
