import React from "react";
import { JobFilters as JobFiltersType } from "@/lib/types";
import { Button, Icon } from "@/components/ui";
import styles from "./ActiveFilters.module.css";

interface ActiveFiltersProps {
  filters: JobFiltersType;
  onFilterRemove: (filterType: string) => void;
  onClearAll: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onFilterRemove,
  onClearAll,
}) => {
  const activeFilters = React.useMemo(() => {
    const active: Array<{
      key: string;
      label: string;
      value: string | boolean;
    }> = [];

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "" && value !== false) {
        let label = "";
        let displayValue: string | boolean = value;

        switch (key) {
          case "experienceLevel":
            label = "Experience";
            break;
          case "company":
            label = "Company";
            break;
          case "internship":
            label = "Internship";
            displayValue = true;
            break;
          case "onsite":
            label = "On-site";
            displayValue = true;
            break;
          case "hybrid":
            label = "Hybrid";
            displayValue = true;
            break;
          case "remote":
            label = "Remote";
            displayValue = true;
            break;
          case "workArrangement":
            label = "Work Arrangement";
            break;
          default:
            label = key.charAt(0).toUpperCase() + key.slice(1);
        }

        active.push({ key, label, value: displayValue });
      }
    });

    return active;
  }, [filters]);

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className={styles.activeFiltersContainer}>
      <div className={styles.activeFiltersHeader}>
        <span className={styles.activeFiltersLabel}>
          <Icon name="ri-filter-3-line" className={styles.filterIcon} />
          Active Filters ({activeFilters.length})
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className={styles.clearAllButton}
        >
          <Icon name="ri-close-line" />
          Clear All
        </Button>
      </div>

      <div className={styles.activeFiltersList}>
        {activeFilters.map((filter) => (
          <div key={filter.key} className={styles.activeFilterTag}>
            <span className={styles.filterContent}>
              <span className={styles.filterLabel}>{filter.label}:</span>
              <span className={styles.filterValue}>
                {typeof filter.value === "boolean" ? "Yes" : filter.value}
              </span>
            </span>
            <button
              onClick={() => onFilterRemove(filter.key)}
              className={styles.removeButton}
              title={`Remove ${filter.label} filter`}
            >
              <Icon name="ri-close-line" className={styles.removeIcon} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;
