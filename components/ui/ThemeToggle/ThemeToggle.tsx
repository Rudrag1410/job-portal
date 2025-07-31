"use client";

import React from "react";
import { useTheme } from "@/lib/providers";
import { Button, Icon } from "..";
import styles from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={`${styles.themeToggle} ${className || ""}`}
    >
      <Icon
        className={styles.icon}
        name={theme === "light" ? "ri-moon-line" : "ri-sun-line"}
      />
    </Button>
  );
}
