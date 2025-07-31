"use client";

import styles from "./ProfilePage.module.css";
import { PROFILE } from "@/lib/constants/profile";
import { Card, Badge } from "@/components/ui";

export default function ProfilePage() {
  return (
    <div className={styles.contentArea}>
      <div className={styles.profileContainer}>
        <Card className={styles.profileCard}>
          <div className={styles.compactProfileHeader}>
            <div className={styles.profileMainInfo}>
              <img
                src={PROFILE.avatar}
                alt={PROFILE.name}
                className={styles.profileAvatar}
              />
              <div className={styles.profileTextInfo}>
                <h1 className={styles.profileName}>{PROFILE.name}</h1>
                <div className={styles.profileTitle}>{PROFILE.title}</div>
                <div className={styles.companyLocation}>
                  <span>
                    <i className="ri-building-line"></i> {PROFILE.company}
                  </span>
                  <span>
                    <i className="ri-map-pin-line"></i> {PROFILE.location}
                  </span>
                  <span>
                    <i className="ri-time-line"></i> {PROFILE.experience}
                  </span>
                </div>
              </div>
            </div>
            <p className={styles.profileBio}>{PROFILE.bio}</p>
          </div>
        </Card>

        <div className={styles.twoColumnLayout}>
          <div className={styles.leftColumn}>
            <Card className={styles.compactCard}>
              <h3 className={styles.compactTitle}>
                <i className="ri-contacts-line"></i>
                Contact
              </h3>
              <div className={styles.compactInfoList}>
                <div className={styles.compactInfoItem}>
                  <i className="ri-mail-line"></i>
                  <span>{PROFILE.email}</span>
                </div>
                <div className={styles.compactInfoItem}>
                  <i className="ri-phone-line"></i>
                  <span>{PROFILE.phone}</span>
                </div>
                <div className={styles.compactInfoItem}>
                  <i className="ri-graduation-cap-line"></i>
                  <span>{PROFILE.education}</span>
                </div>
              </div>
            </Card>

            <div
              className={styles.compactLinkedIn}
              onClick={() => window.open(`https://linkedin.com/in/`, "_blank")}
            >
              <i className="ri-linkedin-line"></i>
              <span>Connect on LinkedIn</span>
              <i className="ri-external-link-line"></i>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <Card className={styles.compactCard}>
              <h3 className={styles.compactTitle}>
                <i className="ri-star-line"></i>
                Skills & Expertise
              </h3>
              <div className={styles.skillsGrid}>
                {PROFILE.skills.map((skill, index) => (
                  <Badge key={index} variant="primary" size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
