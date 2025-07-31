import React from "react";
import { Button, Icon } from "@/components/ui";
import styles from "./JobActions.module.css";

interface JobActionsProps {
  jobId: string;
  isSaved: boolean;
  isApplied: boolean;
  onSave: (jobId: string) => void;
  onApply: (jobId: string) => void;
}

const JobActions: React.FC<JobActionsProps> = ({
  jobId,
  isSaved,
  isApplied,
  onSave,
  onApply,
}) => {
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave(jobId);
  };

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onApply(jobId);
  };

  return (
    <div className={styles.actionsSection}>
      <div className={styles.leftActions}>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          className={styles.actionButton}
        >
          <Icon name={`ri-bookmark-${isSaved ? "fill" : "line"}`} />
        </Button>

        <Button variant="ghost" size="sm" className={styles.actionButton}>
          <Icon name="ri-share-line" />
        </Button>

        <Button variant="ghost" size="sm" className={styles.actionButton}>
          <Icon name="ri-more-2-line" />
        </Button>
      </div>

      <div className={styles.rightActions}>
        <Button variant="outline" size="sm" icon="ri-sparkles-line">
          Ask Buddy
        </Button>

        {isApplied ? (
          <span className={styles.appliedText}>Applied 9h ago</span>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={handleApply}
            className={styles.applyButton}
          >
            Apply
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobActions;
