import React from "react";
import { ButtonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import Icon from "../Icon/Icon";
import styles from "./Button.module.css";

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  className,
  children,
  onClick,
  type = "button",
  ...props
}) => {
  const buttonClass = cn(
    styles.button,
    styles[variant],
    styles[size],
    loading && styles.loading,
    disabled && styles.disabled,
    className
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Icon name="ri-loader-line" className={styles.spinner} />
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <Icon name={icon} className={styles.iconLeft} />
          )}
          <span className={styles.content}>{children}</span>
          {icon && iconPosition === "right" && (
            <Icon name={icon} className={styles.iconRight} />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
