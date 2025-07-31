import React from "react";
import Link from "next/link";
import { Job } from "@/lib/types";
import { Icon, Button } from "@/components/ui";
import JobScore from "../JobScore";
import styles from "./JobCard.module.css";

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  isApplied: boolean;
  onSave: (jobId: string) => void;
  onApply: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  isApplied,
  onSave,
  onApply,
}) => {
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave(job.id);
  };

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onApply(job.id);
  };

  return (
    <div className={styles.jobCard}>
      <div className={styles.cardMain}>
        <div className={styles.leftSection}>
          <div className={styles.companyLogo}>
            <img
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className={styles.logoImage}
            />
          </div>

          <div className={styles.jobInfo}>
            <div className={styles.headerRow}>
              <div className={styles.titleSection}>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                <p className={styles.companyName}>{job.company}</p>
              </div>
              <div className={styles.timePosted}>
                <Icon name="ri-time-line" className={styles.timeIcon} />
                {job.timePosted}
              </div>
            </div>

            <div className={styles.jobMeta}>
              <span className={styles.metaItem}>
                <Icon name="ri-map-pin-line" className={styles.metaIcon} />
                {job.location}
              </span>
              <span className={styles.metaItem}>
                <Icon name="ri-star-line" className={styles.metaIcon} />
                {job.experience}
              </span>
              <span className={styles.metaItem}>
                <Icon
                  name="ri-money-dollar-circle-line"
                  className={styles.metaIcon}
                />
                {job.salary}
              </span>
              <span className={styles.metaItem}>
                <Icon name="ri-time-line" className={styles.metaIcon} />
                {job.type}
              </span>
              <span className={styles.metaItem}>
                <Icon name="ri-computer-line" className={styles.metaIcon} />
                {job.workArrangement}
              </span>
            </div>

            <div className={styles.jobTags}>
              <span className={styles.connectionsTag}>
                {job.connections} connections
              </span>
              <span className={styles.salaryTag}>Attractive Salary</span>
              <span className={styles.applyTag}>Apply now</span>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <JobScore score={job.matchScore} />
        </div>
      </div>

      <div className={styles.actionsSection}>
        <div className={styles.leftActions}>
          <button
            onClick={handleSave}
            className={styles.actionButton}
            aria-label="Save job"
          >
            <Icon name={`ri-bookmark-${isSaved ? "fill" : "line"}`} />
          </button>
          <button className={styles.actionButton} aria-label="Share job">
            <Icon name="ri-share-line" />
          </button>
          <button className={styles.actionButton} aria-label="More options">
            <Icon name="ri-more-2-line" />
          </button>
        </div>

        <div className={styles.rightActions}>
          <Link href={`/jobs/${job.id}`} className={styles.viewJobButton}>
            View Job
            <Icon name="ri-arrow-right-line" />
          </Link>
          <Button
            variant="outline"
            size="sm"
            icon="ri-sparkles-line"
            className={styles.askBuddyButton}
          >
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
    </div>
  );
};

export default JobCard;
