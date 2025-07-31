import React from "react";
import { IconProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import styles from "./Icon.module.css";

const Icon: React.FC<IconProps> = ({ name, size = "md", className }) => {
  const iconClass = cn(styles.icon, styles[size], name, className);

  return <i className={iconClass} />;
};

export default Icon;
