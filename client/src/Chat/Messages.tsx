import { useEffect } from 'react';
import { Message } from './Message/Message';
import styles from './Chat.module.scss';
import { MessageContent } from './Chat';

interface MProps {
  messages: MessageContent[];
}

export const Messages = (props: MProps) => {
  useEffect(() => {
    var objDiv = document.getElementById("messagesBox");
    if(objDiv)
        objDiv.scrollTop = objDiv.scrollHeight;
  }, [props.messages]);


  return (
    <div className={styles.messagesWindow} id={"messagesBox"}>
        {props.messages.map((message: MessageContent) => {
          const randomId = Math.random() * 100;  
          return (
            <Message
              key={`msg-${message.author.username + message.text}-${randomId}`}
              messageText={message.text}
              sender={message.author}
              sentDate={new Date()}
            />
          );
        })}
      </div>
  );
};
