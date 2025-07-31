"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useJobs } from "@/lib";
import { ActiveTab, ActivePage } from "@/lib/types";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ChatBot from "@/components/features/chat/ChatBot";
import { Icon } from "@/components/ui";
import "@/styles/layout.css";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("recommended");
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const pathname = usePathname();
  const { savedJobsCount, appliedJobsCount } = useJobs();

  const getActivePage = (): ActivePage => {
    if (pathname?.includes("/profile") || pathname?.includes("/jobs"))
      return "profile";
    return "jobs";
  };

  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener("tabChange", handleTabChange as EventListener);
    return () =>
      window.removeEventListener("tabChange", handleTabChange as EventListener);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsChatbotVisible(true);
      } else {
        setIsChatbotVisible(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.dispatchEvent(new CustomEvent("headerTabChange", { detail: tab }));
  };

  const activePage = getActivePage();

  return (
    <div
      className={`app-container ${
        activePage === "jobs" ? "three-column-layout" : ""
      }`}
    >
      <div className="app-sidebar" data-sidebar>
        <Sidebar activePage={activePage} />
      </div>

      <div className="app-main">
        <div className="app-header">
          <Header
            activeTab={activeTab}
            onTabChange={handleTabChange}
            savedJobsCount={savedJobsCount}
            appliedJobsCount={appliedJobsCount}
          />
        </div>

        <div className="app-content">{children}</div>
      </div>

      {activePage === "jobs" && (
        <>
          <div
            className={`app-chatbot ${
              isChatbotVisible ? "chatbot-visible" : "chatbot-hidden"
            }`}
          >
            <ChatBot
              onClose={() => setIsChatbotVisible(false)}
              isVisible={isChatbotVisible}
            />
          </div>

          <button
            className="chatbot-toggle"
            onClick={() => setIsChatbotVisible(!isChatbotVisible)}
          >
            <Icon name="ri-robot-line" />
          </button>
        </>
      )}
    </div>
  );
}
