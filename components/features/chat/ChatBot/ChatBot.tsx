"use client";

import React, { useRef, useEffect } from "react";
import { useChatBot } from "@/lib/hooks";
import { Button, Icon } from "@/components/ui";
import ChatMessage from "@/components/features/chat/ChatMessage";
import ChatInput from "@/components/features/chat/ChatInput";
import styles from "./ChatBot.module.css";

interface ChatBotProps {
  onClose?: () => void;
  isVisible?: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose, isVisible = true }) => {
  const {
    messages,
    showQuickQuestions,
    setShowQuickQuestions,
    sendMessage,
    handleQuickQuestion,
  } = useChatBot();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const quickOptions = [
    { label: "Resume Analysis", icon: "ri-file-text-line" },
    { label: "Career Advisor", icon: "ri-lightbulb-line" },
    { label: "Interview Questions", icon: "ri-question-line" },
  ];

  return (
    <div
      className={`${styles.chatWindow} ${
        !isVisible ? styles.chatWindowHidden : ""
      }`}
    >
      <div className={styles.chatHeader}>
        <div className={styles.headerInfo}>
          <Icon name="ri-robot-line" className={styles.botIcon} />
          <div>
            <h3 className={styles.botName}>Buddy</h3>
            <p className={styles.botStatus}>Your AI Copilot</p>
          </div>
        </div>

        <div className={styles.headerActions}>
          <Button
            variant="outline"
            size="sm"
            className={styles.quickGuideButton}
          >
            Quick Guide
          </Button>
          {onClose && (
            <button className={styles.closeButton} onClick={onClose}>
              <Icon name="ri-close-line" />
            </button>
          )}
        </div>
      </div>

      <div className={styles.chatContent}>
        {messages.length > 0 ? (
          <div className={styles.chatMessages}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className={styles.welcomeSection}>
            <div className={styles.spacer}></div>
            <div className={styles.bottomSection}>
              <h4 className={styles.welcomeTitle}>You can ask me about:</h4>
              <div className={styles.quickOptions}>
                {quickOptions.map((option, index) => (
                  <button
                    key={index}
                    className={styles.quickOption}
                    onClick={() => handleQuickQuestion(option.label)}
                  >
                    <span className={styles.optionText}>{option.label}</span>
                    <Icon
                      name="ri-arrow-right-up-line"
                      className={styles.optionIcon}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.chatInputSection}>
        <ChatInput
          onSend={sendMessage}
          onToggleQuestions={() => setShowQuickQuestions(!showQuickQuestions)}
          placeholder="Ask Buddy..."
        />
      </div>
    </div>
  );
};

export default ChatBot;
