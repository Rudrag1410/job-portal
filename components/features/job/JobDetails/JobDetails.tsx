import React from "react";
import { Job } from "@/lib/types";
import { getTimeAgo } from "@/lib/utils";
import { Icon, Badge } from "@/components/ui";
import styles from "./JobDetails.module.css";

interface JobDetailsProps {
  job: Job;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  return (
    <div className={styles.jobInfo}>
      <div className={styles.header}>
        <div className={styles.timePosted}>
          <Icon name="ri-time-line" className={styles.timeIcon} />
          {getTimeAgo(job.timePosted)} ago
        </div>

        <div className={styles.companyLogo}>
          <img
            src={job.companyLogo}
            alt={job.company}
            className={styles.logoImage}
          />
        </div>
      </div>

      <div className={styles.titleSection}>
        <h3 className={styles.jobTitle}>{job.title}</h3>
        <p className={styles.companyName}>{job.company}</p>
      </div>

      <div className={styles.jobDetailsGrid}>
        <div className={styles.detailItem}>
          <Icon name="ri-map-pin-line" className={styles.detailIcon} />
          <span>{job.location}</span>
        </div>

        <div className={styles.detailItem}>
          <Icon name="ri-star-line" className={styles.detailIcon} />
          <span>{job.experience}</span>
        </div>

        <div className={styles.detailItem}>
          <Icon
            name="ri-money-dollar-circle-line"
            className={styles.detailIcon}
          />
          <span>{job.salary}</span>
        </div>

        <div className={styles.detailItem}>
          <Icon name="ri-time-line" className={styles.detailIcon} />
          <span>{job.type}</span>
        </div>

        <div className={styles.detailItem}>
          <Icon name="ri-computer-line" className={styles.detailIcon} />
          <span>{job.workArrangement}</span>
        </div>
      </div>

      <div className={styles.tagsSection}>
        <Badge variant="secondary" size="sm">
          {job.connections} connections
        </Badge>

        <Badge variant="success" size="sm">
          Attractive Salary
        </Badge>

        <Badge variant="primary" size="sm">
          Apply now
        </Badge>
      </div>
    </div>
  );
};

export default JobDetails;
