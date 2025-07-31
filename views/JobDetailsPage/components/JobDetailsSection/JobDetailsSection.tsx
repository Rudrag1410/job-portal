import React from "react";
import { Card, Badge, Icon } from "@/components/ui";
import { Job } from "@/lib/types";
import styles from "./JobDetailsSection.module.css";

interface JobDetailsSectionProps {
  job: Job;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ job }) => {
  return (
    <Card className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <Icon name="ri-briefcase-line" />
        </div>
        <h3 className={styles.sectionTitle}>Job Details</h3>
      </div>
      <ul className={styles.jobDetailsList}>
        {job.jobDetails &&
          job.jobDetails.map((detail, index) => (
            <li key={index} className={styles.jobDetailItem}>
              {detail}
            </li>
          ))}
      </ul>
      <div className={styles.tagsList}>
        {job.skills &&
          job.skills.map((skill, index) => (
            <Badge key={index} variant="default" size="sm">
              {skill}
            </Badge>
          ))}
      </div>
    </Card>
  );
};

export default JobDetailsSection;
