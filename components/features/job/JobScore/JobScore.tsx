import React from "react";
import { getScoreClass, getScoreLabel } from "@/lib/utils";
import { Icon } from "@/components/ui";
import styles from "./JobScore.module.css";

interface JobScoreProps {
  score: number;
  features?: string[];
}

const JobScore: React.FC<JobScoreProps> = ({
  score,
  features = ["Growth Opportunities", "Actively Hiring"],
}) => {
  const scoreClass = getScoreClass(score);
  const scoreLabel = getScoreLabel(score);

  return (
    <div className={`${styles.matchScoreSection} ${styles[scoreClass]}`}>
      <div className={styles.desktopView}>
        <div className={styles.scoreCircle}>
          <svg className={styles.scoreCircleSvg} viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r="20"
              className={styles.scoreBackground}
              fill="none"
              strokeWidth="4"
            />
            <circle
              cx="25"
              cy="25"
              r="20"
              className={styles.scoreForeground}
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                strokeDasharray: `${score * 1.256} 125.6`,
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
              }}
            />
          </svg>
          <div className={styles.scoreValue}>{score}%</div>
        </div>

        <div className={styles.scoreLabel}>{scoreLabel}</div>
        <div className={styles.scoreCategory}>Match</div>

        <div className={styles.scoreFeatures}>
          {features.map((feature, index) => (
            <div key={index} className={styles.scoreFeature}>
              <Icon name="ri-check-line" className={styles.scoreFeatureIcon} />
              {feature}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.mobileView}>
        <div className={styles.badgeContent}>
          <span className={styles.badgeScore}>{score}%</span>
          <span className={styles.badgeLabel}>{scoreLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default JobScore;
