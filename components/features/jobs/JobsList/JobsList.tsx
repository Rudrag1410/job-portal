"use client";

import React from "react";
import { Job } from "@/lib/types";
import { EmptyState } from "@/components/ui";
import styles from "./JobsList.module.css";
import JobCard from "../../job/JobCard";

interface JobsListProps {
  jobs: Job[];
  savedJobIds: string[];
  appliedJobIds: string[];
  onSaveJob: (jobId: string) => void;
  onApplyJob: (jobId: string) => void;
  isLoading?: boolean;
}

const JobsList: React.FC<JobsListProps> = ({
  jobs,
  savedJobIds,
  appliedJobIds,
  onSaveJob,
  onApplyJob,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Finding the best jobs for you...</p>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className={styles.container}>
        <EmptyState
          icon="ri-briefcase-line"
          title="No jobs found"
          message="Try adjusting your filters or search terms to find more job opportunities."
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.jobsGrid}>
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={savedJobIds.includes(job.id)}
            isApplied={appliedJobIds.includes(job.id)}
            onSave={onSaveJob}
            onApply={onApplyJob}
          />
        ))}
      </div>
    </div>
  );
};

export default JobsList;
