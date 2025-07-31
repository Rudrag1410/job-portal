import React from "react";
import { BadgeProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import styles from "./Badge.module.css";

const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  children,
  className,
  ...props
}) => {
  const badgeClass = cn(styles.badge, styles[variant], styles[size], className);

  return (
    <span className={badgeClass} {...props}>
      {children}
    </span>
  );
};

export default Badge;
