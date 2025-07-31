import React from "react";
import { EmptyStateProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import styles from "./EmptyState.module.css";

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "ri-inbox-line",
  title,
  message,
  action,
  className,
}) => {
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.iconWrapper}>
        <Icon name={icon} className={styles.icon} />
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>

      {action && (
        <Button onClick={action.onClick} className={styles.action}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
