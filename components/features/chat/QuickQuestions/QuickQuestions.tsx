import React from "react";
import { QUICK_QUESTIONS } from "@/lib/constants";
import { Button } from "@/components/ui";
import styles from "./QuickQuestions.module.css";

interface QuickQuestionsProps {
  onSelect: (question: string) => void;
}

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ onSelect }) => {
  return (
    <div className={styles.quickQuestions}>
      <h4 className={styles.title}>Quick Questions</h4>
      <div className={styles.questionsGrid}>
        {QUICK_QUESTIONS.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelect(question)}
            className={styles.questionButton}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickQuestions;
