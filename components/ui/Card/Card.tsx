import React from "react";
import { CardProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import styles from "./Card.module.css";

const Card: React.FC<CardProps> = ({
  className,
  children,
  clickable = false,
  onClick,
  ...props
}) => {
  const cardClass = cn(styles.card, clickable && styles.clickable, className);

  const Component = clickable && onClick ? "button" : "div";

  return (
    <Component className={cardClass} onClick={onClick} {...props}>
      {children}
    </Component>
  );
};

export default Card;
