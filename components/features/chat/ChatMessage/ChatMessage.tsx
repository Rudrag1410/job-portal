import React from "react";
import { ChatMessage as ChatMessageType } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Icon } from "@/components/ui";
import styles from "./ChatMessage.module.css";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={`${styles.message} ${
        message.isUser ? styles.userMessage : styles.botMessage
      }`}
    >
      <div className={styles.messageContent}>
        {!message.isUser && (
          <div className={styles.botAvatar}>
            <Icon name="ri-robot-line" />
          </div>
        )}

        <div className={styles.messageBody}>
          <div className={styles.messageText}>{message.text}</div>
          <div className={styles.messageTime}>
            {formatDate(message?.timestamp)}
          </div>
        </div>

        {message.isUser && (
          <div className={styles.userAvatar}>
            <Icon name="ri-user-line" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
