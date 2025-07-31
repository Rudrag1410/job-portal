"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Button, Icon, ThemeToggle } from "@/components/ui";
import { ActiveTab } from "@/lib/types";
import styles from "./Header.module.css";
import { APP_NAME } from "@/lib";

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  savedJobsCount: number;
  appliedJobsCount: number;
}

const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  savedJobsCount,
  appliedJobsCount,
}) => {
  const pathname = usePathname();

  const tabs = [
    { key: "recommended" as ActiveTab, label: "Recommended" },
    { key: "saved" as ActiveTab, label: `Saved (${savedJobsCount})` },
    { key: "applied" as ActiveTab, label: `Applied (${appliedJobsCount})` },
  ];

  const profileTabs = [
    { key: "details", label: "Details", active: true },
    { key: "preferences", label: "Preferences", active: false },
    { key: "settings", label: "Settings", active: false },
  ];

  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <h3 className={styles.title}>
          {pathname === "/profile" ? "Profile" : APP_NAME}
        </h3>
        <div className={styles.breadcrumb}>
          <Icon name="ri-briefcase-line" className={styles.breadcrumbIcon} />
          <Icon
            name="ri-arrow-right-s-line"
            className={styles.breadcrumbIcon}
          />
        </div>
      </div>

      <div className={styles.centerSection}>
        {pathname === "/profile" ? (
          <div className={styles.tabContainer}>
            {profileTabs.map((tab) => (
              <button
                key={tab.key}
                className={`${styles.tab} ${tab.active ? styles.active : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.tabContainer}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`${styles.tab} ${
                  activeTab === tab.key ? styles.active : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.rightSection}>
        <ThemeToggle className={styles.actionButton} />

        <Button variant="ghost" size="sm" className={styles.actionButton}>
          <Icon name="ri-notification-line" />
        </Button>

        <Button variant="ghost" size="sm" className={styles.actionButton}>
          <Icon name="ri-message-line" />
        </Button>

        <Button variant="ghost" size="sm" className={styles.actionButton}>
          <Icon name="ri-settings-line" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
