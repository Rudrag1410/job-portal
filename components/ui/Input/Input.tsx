import React from "react";
import { cn } from "@/lib/utils";
import Icon from "../Icon/Icon";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconClick,
  className,
  ...props
}) => {
  const inputClass = cn(
    styles.input,
    leftIcon && styles.hasLeftIcon,
    rightIcon && styles.hasRightIcon,
    error && styles.error,
    className
  );

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputWrapper}>
        {leftIcon && <Icon name={leftIcon} className={styles.leftIcon} />}

        <input className={inputClass} {...props} />

        {rightIcon && (
          <button
            type="button"
            className={styles.rightIconButton}
            onClick={onRightIconClick}
          >
            <Icon name={rightIcon} className={styles.rightIcon} />
          </button>
        )}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;
