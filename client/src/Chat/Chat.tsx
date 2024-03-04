import { Message } from "./Message/Message";

export const Chat = () => {
  return (
    <div>
      <Message
        messageText="sfsadfdsafdsfdsfsdfsd fsdf sdf sdf sdf sdf sdfsdfsdf sdf sdf sdfsdf sdf"
        sender="lenko"
        sentDate={new Date()}
      />
    </div>
  );
};
