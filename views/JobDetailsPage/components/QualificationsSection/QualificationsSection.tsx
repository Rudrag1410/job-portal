import React from "react";
import { Card, Icon } from "@/components/ui";
import { Job } from "@/lib/types";
import styles from "./QualificationsSection.module.css";

interface QualificationsSectionProps {
  job: Job;
}

const QualificationsSection: React.FC<QualificationsSectionProps> = ({
  job,
}) => {
  const hardcodedRequiredQualifications = [
    { icon: "ri-graduation-cap-line", text: "BS/BA Degree or higher" },
    { icon: "ri-briefcase-line", text: "1+ Years of Work Experience" },
    { icon: "ri-code-line", text: "1+ years of SQL" },
    { icon: "ri-presentation-line", text: "A+ in PowerPoint" },
    { icon: "ri-file-excel-line", text: "A+ in MS Excel" },
    { icon: "ri-file-word-line", text: "A+ in MS Word" },
    { icon: "ri-brain-line", text: "Excellent Analytical Skills" },
    { icon: "ri-lightbulb-line", text: "Excellent Problem Solving Skills" },
    { icon: "ri-message-3-line", text: "Effective Communication" },
    { icon: "ri-team-line", text: "Seamlessly Collaborative" },
  ];

  return (
    <Card className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <Icon name="ri-graduation-cap-line" />
        </div>
        <h3 className={styles.sectionTitle}>Qualifications</h3>
      </div>

      <div className={styles.qualificationSection}>
        <h4 className={styles.qualificationSubtitle}>Required Skills</h4>
        <div className={styles.qualificationGrid}>
          {hardcodedRequiredQualifications.map((qual, index) => (
            <div key={index} className={styles.qualificationItem}>
              <Icon name={qual.icon} className={styles.qualificationIcon} />
              <span>{qual.text}</span>
            </div>
          ))}
        </div>

        {job.qualifications?.required && (
          <ul className={styles.jobDetailsList}>
            {job.qualifications.required.map((req, index) => (
              <li key={index} className={styles.jobDetailItem}>
                {req}
              </li>
            ))}
          </ul>
        )}
      </div>

      {job.qualifications?.additional && (
        <div className={styles.qualificationSection}>
          <h4 className={styles.qualificationSubtitle}>
            Additional Requirements
          </h4>
          <ul className={styles.jobDetailsList}>
            {job.qualifications.additional.map((add, index) => (
              <li key={index} className={styles.jobDetailItem}>
                {add}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default QualificationsSection;
