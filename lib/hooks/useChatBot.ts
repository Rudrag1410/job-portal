import { useState } from "react";
import { ChatMessage } from "../types";
import { generateId } from "../utils";
import { FAQ_RESPONSES } from "../constants/faq";

interface UseChatBotReturn {
  messages: ChatMessage[];
  inputValue: string;
  isOpen: boolean;
  showQuickQuestions: boolean;
  setInputValue: (value: string) => void;
  setIsOpen: (open: boolean) => void;
  setShowQuickQuestions: (show: boolean) => void;
  sendMessage: (text: string) => void;
  handleQuickQuestion: (question: string) => void;
  clearChat: () => void;
}

export function useChatBot(): UseChatBotReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setShowQuickQuestions(false);

    // Generate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(text.trim());
      const botMessage: ChatMessage = {
        id: generateId(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return {
    messages,
    inputValue,
    isOpen,
    showQuickQuestions,
    setInputValue,
    setIsOpen,
    setShowQuickQuestions,
    sendMessage,
    handleQuickQuestion,
    clearChat,
  };
}

function generateBotResponse(userInput: string): string {
  const input = userInput.toLowerCase();

  const faqKey = Object.keys(FAQ_RESPONSES).find(
    (key) => key.toLowerCase() === userInput
  );

  if (faqKey) {
    return FAQ_RESPONSES[faqKey as keyof typeof FAQ_RESPONSES];
  }

  // Check for keyword matches
  if (input.includes("resume") || input.includes("cv")) {
    return FAQ_RESPONSES["How can I improve my resume?"];
  }

  if (input.includes("interview")) {
    if (input.includes("technical")) {
      return FAQ_RESPONSES["How do I prepare for a technical interview?"];
    }
    if (
      input.includes("dress") ||
      input.includes("wear") ||
      input.includes("clothes")
    ) {
      return FAQ_RESPONSES["What should I wear to an interview?"];
    }
    if (input.includes("question")) {
      return FAQ_RESPONSES["What are common interview questions?"];
    }
    if (input.includes("follow up") || input.includes("after")) {
      return FAQ_RESPONSES[
        "What's the best way to follow up after an interview?"
      ];
    }
    return FAQ_RESPONSES["What are common interview questions?"];
  }

  if (
    input.includes("salary") ||
    input.includes("negotiate") ||
    input.includes("pay")
  ) {
    return FAQ_RESPONSES["How do I negotiate salary?"];
  }

  if (input.includes("job search") || input.includes("finding job")) {
    return "For job searching, I recommend: 1) Tailoring your resume for each application, 2) Networking within your industry, 3) Using multiple job boards, 4) Preparing for common interview questions, and 5) Following up professionally after applications.";
  }

  if (input.includes("career change") || input.includes("switch career")) {
    return "Career transitions can be exciting! Consider: 1) Identifying transferable skills, 2) Gaining relevant experience through projects or volunteering, 3) Networking in your target industry, 4) Taking relevant courses or certifications, and 5) Starting with informational interviews.";
  }

  if (input.includes("linkedin") || input.includes("profile")) {
    return "For a strong LinkedIn profile: 1) Use a professional headshot, 2) Write a compelling headline, 3) Craft a detailed summary showcasing your value, 4) List relevant skills and get endorsements, 5) Share industry-relevant content, and 6) Connect with professionals in your field.";
  }

  if (input.includes("cover letter")) {
    return "A great cover letter should: 1) Be tailored to the specific job and company, 2) Start with a strong opening that grabs attention, 3) Highlight your most relevant achievements, 4) Show knowledge of the company, 5) End with a clear call to action, and 6) Be concise (ideally one page).";
  }

  if (input.includes("thank") || input.includes("thanks")) {
    return "You're welcome! I'm here to help with any career-related questions. Feel free to ask about job searching, interviews, resume writing, or career development anytime!";
  }

  if (
    input.includes("hello") ||
    input.includes("hi") ||
    input.includes("hey")
  ) {
    return "Hello! I'm here to help with your career questions. What would you like to know about job searching, interviews, resume writing, or career development?";
  }

  // Default response for unrecognized inputs
  return "I'd be happy to help you with that! Could you be more specific? I can assist with resume writing, interview preparation, salary negotiation, job search strategies, and general career advice. You can also try one of the quick questions above.";
}
