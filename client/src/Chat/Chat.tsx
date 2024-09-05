import { useEffect, useRef, useState } from 'react';
import styles from './Chat.module.scss';
import { AuthorInfo } from '../utils/interfaces';
import { Messages } from './Messages';

export interface MessageContent {
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
      const ws = new WebSocket(`ws://localhost:5000`, ['Authorization', authToken]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Messages messages={messages}></Messages>
      <div className={styles.sendMessage}>
        <form onSubmit={handleMessageCreate}>
          <input ref={inputRef} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
