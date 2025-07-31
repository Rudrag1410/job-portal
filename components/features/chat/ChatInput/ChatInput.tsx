"use client";

import React, { useState, KeyboardEvent } from "react";
import { Input, Button, Icon } from "@/components/ui";
import styles from "./ChatInput.module.css";

interface ChatInputProps {
  onSend: (message: string) => void;
  onToggleQuestions: () => void;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onToggleQuestions,
  placeholder = "Type your message...",
}) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim()) {
      onSend(value.trim());
      setValue("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className={styles.input}
      />

      <div className={styles.actions}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleQuestions}
          className={styles.actionButton}
        >
          <Icon name="ri-sparkling-2-line" />
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={handleSend}
          disabled={!value.trim()}
          className={styles.sendButton}
        >
          <Icon name="ri-send-plane-line" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
