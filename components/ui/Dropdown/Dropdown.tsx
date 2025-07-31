"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { DropdownProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import Icon from "../Icon/Icon";
import styles from "./Dropdown.module.css";

interface DropdownPosition {
  top: number;
  left: number;
  width: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  onSelect,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
    width: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4, // 4px gap
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        updatePosition();
      }
    };

    const handleResize = () => {
      if (isOpen) {
        updatePosition();
      }
    };

    if (isOpen) {
      updatePosition();
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Portal menu component
  const PortalMenu = () => {
    if (!isOpen || typeof window === "undefined") return null;

    return createPortal(
      <div
        ref={menuRef}
        className={styles.menu}
        style={{
          position: "fixed",
          top: `${position.top}px`,
          left: `${position.left}px`,
          minWidth: `${position.width}px`,
          zIndex: 9999,
        }}
      >
        {items.map((item, index) => (
          <button
            key={index}
            className={styles.menuItem}
            onClick={() => handleSelect(item.value)}
          >
            {item.icon && <Icon name={item.icon} className={styles.menuIcon} />}
            <span>{item.label}</span>
          </button>
        ))}
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className={cn(styles.dropdown, className)} ref={dropdownRef}>
        <div
          ref={triggerRef}
          className={styles.trigger}
          onClick={toggleDropdown}
        >
          {trigger}
        </div>
      </div>
      <PortalMenu />
    </>
  );
};

export default Dropdown;
