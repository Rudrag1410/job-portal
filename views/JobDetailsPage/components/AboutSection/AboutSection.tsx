import React from "react";
import { Card, Badge, Icon } from "@/components/ui";
import { Job } from "@/lib/types";
import styles from "./AboutSection.module.css";

interface AboutSectionProps {
  job: Job;
}

const AboutSection: React.FC<AboutSectionProps> = ({ job }) => {
  return (
    <Card className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <Icon name="ri-information-line" />
        </div>
        <h3 className={styles.sectionTitle}>About</h3>
      </div>
      <p className={styles.sectionContent}>{job.about}</p>
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

export default AboutSection;
