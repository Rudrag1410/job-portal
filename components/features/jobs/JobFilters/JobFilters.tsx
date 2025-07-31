import React from "react";
import { JobFilters as JobFiltersType } from "@/lib/types";
import { FILTER_OPTIONS } from "@/lib/constants";
import { Button, Icon, Dropdown } from "@/components/ui";
import ActiveFilters from "./ActiveFilters";
import styles from "./JobFilters.module.css";

interface JobFiltersProps {
  filters: JobFiltersType;
  activeDropdown: string | null;
  onFilterChange: (filterType: string, value: string | boolean) => void;
  onFilterRemove: (filterType: string) => void;
  onDropdownToggle: (dropdown: string) => void;
  onClearAll: () => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  activeDropdown,
  onFilterChange,
  onFilterRemove,
  onDropdownToggle,
  onClearAll,
}) => {
  return (
    <>
      <div className={styles.filtersContainer}>
        {FILTER_OPTIONS.map((filter, index) => (
          <div key={index} style={{ position: "relative" }}>
            {filter.toggle ? (
              <Button
                variant={
                  filters[filter.key as keyof JobFiltersType]
                    ? "primary"
                    : "outline"
                }
                size="sm"
                icon={filter.icon}
                onClick={() =>
                  onFilterChange(
                    filter.key,
                    !filters[filter.key as keyof JobFiltersType]
                  )
                }
                className={styles.filterButton}
              >
                {filters[filter.key as keyof JobFiltersType]
                  ? `${filter.label} ✓`
                  : filter.label}
              </Button>
            ) : (
              <Dropdown
                trigger={
                  <Button
                    variant={
                      filters[filter.key as keyof JobFiltersType]
                        ? "primary"
                        : "outline"
                    }
                    size="sm"
                    icon={filter.icon}
                    iconPosition="left"
                    className={styles.filterButton}
                  >
                    {filters[filter.key as keyof JobFiltersType]
                      ? `${filter.label}: ${
                          filters[filter.key as keyof JobFiltersType]
                        }`
                      : filter.label}
                    <Icon
                      name="ri-arrow-down-s-line"
                      className={styles.dropdownArrow}
                    />
                  </Button>
                }
                items={[
                  { label: `All ${filter.label}`, value: "" },
                  ...(filter.options || []).map((option) => ({
                    label: option,
                    value: option,
                  })),
                ]}
                onSelect={(value) => onFilterChange(filter.key, value)}
                className={styles.dropdown}
              />
            )}
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          icon="ri-close-line"
          onClick={onClearAll}
          className={styles.clearAllButton}
        >
          Clear All
        </Button>
      </div>

      <ActiveFilters
        filters={filters}
        onFilterRemove={onFilterRemove}
        onClearAll={onClearAll}
      />
    </>
  );
};

export default JobFilters;
