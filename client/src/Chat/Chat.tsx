import { useEffect, useRef, useState } from 'react';
import { Message } from './Message/Message';
import styles from './Chat.module.scss';
import { AuthorInfo } from '../utils/interfaces';

interface MessageContent {
  text: string;
  author: AuthorInfo;
}

interface ChatProps {
  authToken: string;
}

export const Chat = (props: ChatProps) => {
  const { authToken } = props;
  const [messages, setMessages] = useState<MessageContent[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const connection = useRef<WebSocket>();
  const rendered = useRef<boolean>(false);

  useEffect(() => {
    if (rendered.current) {
      const ws = new WebSocket(`wss://chatapp.blubitoapps.com`, ['Authorization', authToken]);

      ws.onopen = (openEvent) => {
        console.log('Open event: ', openEvent);

        ws.onmessage = (msgEvent) => {
          if (msgEvent.data !== 'Connected to WebSocket server') {
            setMessages(JSON.parse(msgEvent.data));
          }
        };

        ws.onclose = (closeEvent) => {
          console.log('Close event: ', closeEvent);
        };
      };

      connection.current = ws;

      return () => {
        if (connection.current) connection.current.close();
      };
    }
    rendered.current = true;
  }, []);

  const handleMessageCreate = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!inputRef.current?.value || !connection.current) return;
    const wsPayload = String(inputRef.current.value);
    inputRef.current.value = '';
    connection.current.send(wsPayload);
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
