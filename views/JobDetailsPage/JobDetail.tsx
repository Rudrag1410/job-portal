"use client";

import { useState } from "react";
import Link from "next/link";
import { indianJobsData } from "@/lib/constants/jobs";
import { useJobs } from "@/lib";
import { Button, Card, Badge, Icon, EmptyState } from "@/components/ui";
import styles from "./JobDetail.module.css";
import JobScore from "@/components/features/job/JobScore";
import JobActions from "@/components/features/job/JobActions";
import AboutSection from "./components/AboutSection";
import JobDetailsSection from "./components/JobDetailsSection";
import QualificationsSection from "./components/QualificationsSection";

interface JobDetailProps {
  jobId: string;
}

export default function JobDetail({ jobId }: JobDetailProps) {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const { isJobSaved, isJobApplied, toggleSaveJob, applyToJob } = useJobs();

  const isSaved = isJobSaved(jobId);
  const isApplied = isJobApplied(jobId);

  const job = indianJobsData.find((j) => j.id === jobId);

  const handleApply = () => {
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = () => {
    setApplicationSubmitted(true);
    applyToJob(jobId);
    setTimeout(() => {
      setShowApplicationModal(false);
      setApplicationSubmitted(false);
    }, 2000);
  };

  const handleSave = (jobId: string) => {
    toggleSaveJob(jobId);
  };

  const handleJobApply = (jobId: string) => {
    handleApply();
  };

  if (!job) {
    return (
      <div className={styles.errorState}>
        <EmptyState
          icon="ri-search-line"
          title="Job Not Found"
          message="The job you're looking for doesn't exist or has been removed."
          action={{
            label: "Back to Jobs",
            onClick: () => (window.location.href = "/"),
          }}
        />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Job Details</h1>
        <Link href="/" className={styles.backLink}>
          <Button
            variant="outline"
            size="sm"
            icon="ri-arrow-left-line"
            iconPosition="left"
          >
            Back
          </Button>
        </Link>
      </div>

      <Card className={styles.jobCard}>
        <div className={styles.jobHeader}>
          <div className={styles.companySection}>
            <div className={styles.companyLogo}>
              <img
                src={job.companyLogo}
                alt={job.company}
                className={styles.logoImage}
              />
            </div>

            <div className={styles.jobInfo}>
              <div className={styles.jobTitleSection}>
                <h2 className={styles.jobTitle}>{job.title}</h2>
                <div className={styles.rating}>
                  <Icon name="ri-star-fill" />
                  <span className={styles.ratingNumber}>
                    {job.companyRating}
                  </span>
                  <span className={styles.reviewCount}>
                    ({job.reviewCount} Reviews)
                  </span>
                </div>
              </div>
              <div className={styles.companyName}>{job.company}</div>

              <div className={styles.jobMeta}>
                <div className={styles.metaItem}>
                  <Icon name="ri-map-pin-line" />
                  <span>{job.location}</span>
                </div>
                <div className={styles.metaItem}>
                  <Icon name="ri-time-line" />
                  <span>{job.experience}</span>
                </div>
                <div className={styles.metaItem}>
                  <Icon name="ri-money-dollar-circle-line" />
                  <span>{job.salary}</span>
                </div>
                <div className={styles.metaItem}>
                  <Icon name="ri-briefcase-line" />
                  <span>{job.type}</span>
                </div>
                <div className={styles.metaItem}>
                  <Icon name="ri-home-wifi-line" />
                  <span>{job.workArrangement}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.scoreSection}>
            <JobScore
              score={job.matchScore as number}
              features={["Growth Opportunities", "Actively Hiring"]}
            />
          </div>
        </div>

        <div className={styles.badgesSection}>
          <Badge variant="secondary" size="sm">
            {job.connections} connections
          </Badge>
          <Badge variant="success" size="sm">
            High Salary
          </Badge>
          <Badge variant="success" size="sm">
            Apply early
          </Badge>
        </div>
        <div className={styles.actionsSection}>
          <JobActions
            jobId={job.id}
            isSaved={isSaved}
            isApplied={isApplied}
            onSave={handleSave}
            onApply={handleJobApply}
          />
        </div>

        <div className={styles.postInfo}>
          <div className={styles.postedBy}>
            <span>Posted by</span>
            <div className={styles.avatar}>{job.postedBy?.charAt(0)}</div>
            <span className={styles.posterName}>{job.postedBy}</span>
            <Icon name="ri-linkedin-box-fill" className={styles.linkedinIcon} />
          </div>
          <span className={styles.separator}>|</span>
          <span>{job.posted}</span>
          <span className={styles.separator}>|</span>
          <span>Openings {job.openings}</span>
          <span className={styles.separator}>|</span>
          <span>Applicants {job.applicants}</span>
        </div>
      </Card>

      <Card className={styles.aiPromotion}>
        <div className={styles.promoContent}>
          <div className={styles.promoLeft}>
            <div className={styles.promoIcon}>
              <Icon name="ri-robot-line" />
            </div>
            <div>
              <div className={styles.promoTitle}>
                Maximize Your Interview Chances
              </div>
              <div className={styles.promoSubtitle}>
                Try our AI Feature Now!
              </div>
            </div>
          </div>
          <Button variant="primary" size="sm">
            Customize
          </Button>
        </div>
      </Card>

      <div className={styles.sectionsGrid}>
        <AboutSection job={job} />
        <JobDetailsSection job={job} />
        <QualificationsSection job={job} />
      </div>

      {showApplicationModal && (
        <div className={styles.modalOverlay}>
          <Card className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Apply for {job.title}</h3>
            {applicationSubmitted ? (
              <div className={styles.modalSuccess}>
                <Icon name="ri-check-line" className={styles.successIcon} />
                <h4 className={styles.successTitle}>Application Submitted!</h4>
                <p className={styles.successMessage}>
                  Your application has been successfully submitted. We'll get
                  back to you soon.
                </p>
              </div>
            ) : (
              <div>
                <p className={styles.modalText}>
                  Are you sure you want to apply for this position?
                </p>
                <div className={styles.modalActions}>
                  <Button
                    variant="primary"
                    onClick={handleSubmitApplication}
                    className={styles.modalButton}
                  >
                    Submit Application
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowApplicationModal(false)}
                    className={styles.modalButton}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
