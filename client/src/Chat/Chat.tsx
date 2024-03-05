/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message/Message";
import styles from "./Chat.module.scss";

export const Chat = (props: {authenticationToken: string}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const ws = new WebSocket(`ws://localhost:5000?token=${props.authenticationToken}`);

  ws.onmessage = (event) => {
    if(event.data !== 'Connected to WebSocket server') {
      console.log('Received message:', event.data);
      setMessages(JSON.parse(event.data));
    }
  };
  
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(()=>{
    console.log('re-render', messages);
    
  }, [messages])

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesWindow}>
        {messages.length}
        {
           messages.map((message: any) => {
            return (
              <Message
                messageText={message.text}
                sender={message.author}
                sentDate={new Date()}
              />
            )
           })
        }
        {/* <Message
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
        /> */}
      </div>
      <div className={styles.sendMessage}>
        <form onSubmit={(e: any) => {
          e.preventDefault()
          console.log(e.target[0].value);
          ws.send(e.target[0].value);
        }}>
          <input ref={inputRef} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
