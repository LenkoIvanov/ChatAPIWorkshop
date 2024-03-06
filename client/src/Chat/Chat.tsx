import { useEffect, useRef, useState } from "react";
import { Message } from "./Message/Message";
import styles from "./Chat.module.scss";

interface MessageContent {
  text: string;
  author: {
    username: string,
    color: string
  };
}

interface ChatProps {
  authToken: string;
}

export const Chat = (props: ChatProps) => {
  const { authToken } = props;
  const [messages, setMessages] = useState<MessageContent[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const ws = new WebSocket(`ws://localhost:5000?token=${authToken}`);

  useEffect(() => {
    ws.onopen = () => {
      ws.send("ccc");
    };

    ws.onmessage = (event) => {
      console.log(event.data);
      if (event.data !== "Connected to WebSocket server") {
        console.log("Received message:", event.data);
        setMessages(JSON.parse(event.data));
      }
    };
  }, []);

  const handleMessageCreate = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!inputRef.current?.value) return;
    const wsPayload = String(inputRef.current.value);
    inputRef.current.value = "";
    ws.send(wsPayload);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesWindow}>
        {messages.map((message: MessageContent) => {
          return (
            <Message
              key={`msg-${message.author.username + message.text}`}
              messageText={message.text}
              sender={message.author}
              sentDate={new Date()}
            />
          );
        })}
      </div>
      <div className={styles.sendMessage}>
        <form onSubmit={handleMessageCreate}>
          <input ref={inputRef} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
