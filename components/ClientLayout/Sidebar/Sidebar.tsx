"use client";

import React from "react";
import Link from "next/link";
import { ActivePage } from "@/lib/types";
import { DEFAULT_USER, APP_NAME } from "@/lib/constants";
import { Button, Icon, Badge } from "@/components/ui";
import { MAIN_MENU_ITEMS, BOTTOM_MENU_ITEMS } from "@/lib/constants/menuItems";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  activePage: ActivePage;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  const menuItems = MAIN_MENU_ITEMS.map((item) => ({
    ...item,
    active: item.name.toLowerCase() === activePage,
  }));

  return (
    <div className={styles.sidebar}>
      <Link href="/" className={styles.logoSection}>
        <div className={styles.logoIcon}>
          <Icon name="ri-search-line" />
        </div>
        <span className={styles.logoText}>{APP_NAME}</span>
      </Link>

      <nav className={styles.navigation}>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href} className="no-underline">
            <div
              className={`${styles.menuItem} ${
                item.active ? styles.active : ""
              }`}
            >
              <Icon name={item.icon} className={styles.menuIcon} />
              <span className={styles.menuLabel}>{item.name}</span>
              {item.badge && (
                <Badge variant="primary" size="sm" className={styles.menuBadge}>
                  {item.badge}
                </Badge>
              )}
              {item.active && (
                <Icon name="ri-check-line" className={styles.activeIndicator} />
              )}
            </div>
          </Link>
        ))}
      </nav>

      <div className={styles.upgradeSection}>
        <div className={styles.upgradeTitle}>
          <Icon name="ri-lightbulb-line" className={styles.upgradeIcon} />
          Try AI benefits with Full Access
        </div>
        <Button variant="primary" size="sm" className={styles.upgradeButton}>
          Upgrade
        </Button>
      </div>

      <div className={styles.bottomSection}>
        {BOTTOM_MENU_ITEMS.map((item, index) => (
          <Link key={index} href={item.href} className="no-underline">
            <div className={styles.bottomMenuItem}>
              <Icon name={item.icon} className={styles.menuIcon} />
              <span className={styles.menuLabel}>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/profile" className="no-underline">
        <div className={styles.profileSection}>
          <img
            src={DEFAULT_USER.avatar}
            alt={DEFAULT_USER.name}
            className={styles.profileAvatar}
          />
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>{DEFAULT_USER.name}</div>
            <div className={styles.profileTitle}>{DEFAULT_USER.title}</div>
          </div>
        </div>
      </Link>

      <Button
        variant="ghost"
        icon="ri-logout-box-line"
        className={styles.signOutButton}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Sidebar;
