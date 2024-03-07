import styles from './ChatBubble.module.scss';

interface ChatBubbleProps {
  name: string;
  color: string;
}
export const ChatBubble = (props: ChatBubbleProps) => {
  const { name, color } = props;

  const getInitials = (name: string): string => {
    const splitName = name.split(' ');
    return splitName[0][0].toUpperCase() + (splitName[1] ? splitName[1][0] : '').toUpperCase();
  };

  return (
    <div style={{ backgroundColor: color }} className={styles.bubble}>
      {getInitials(name)}
    </div>
  );
};
