"use client";

import React from "react";
import { useJobFilters, useJobs } from "@/lib";
import { indianJobsData } from "@/lib/constants/jobs";
import JobsList from "@/components/features/jobs/JobsList";
import JobFilters from "@/components/features/jobs/JobFilters";
import styles from "./JobsPage.module.css";

const JobsPage = () => {
  const { savedJobs, appliedJobs, toggleSaveJob, applyToJob } = useJobs();

  const {
    filteredJobs,
    filters,
    activeTab,
    activeDropdown,
    setActiveTab,
    handleFilterChange,
    handleFilterRemove,
    handleDropdownToggle,
    clearFilters,
  } = useJobFilters({
    jobs: indianJobsData,
    savedJobIds: savedJobs,
    appliedJobIds: appliedJobs,
  });

  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent("tabChange", { detail: activeTab }));
  }, [activeTab]);

  React.useEffect(() => {
    const handleHeaderTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener(
      "headerTabChange",
      handleHeaderTabChange as EventListener
    );
    return () =>
      window.removeEventListener(
        "headerTabChange",
        handleHeaderTabChange as EventListener
      );
  }, [setActiveTab]);

  const handleSaveJob = (jobId: string) => {
    toggleSaveJob(jobId);
  };

  const handleApplyJob = (jobId: string) => {
    applyToJob(jobId);
  };

  return (
    <div className={styles.pageContainer}>
      <JobFilters
        filters={filters}
        activeDropdown={activeDropdown}
        onFilterChange={handleFilterChange}
        onFilterRemove={handleFilterRemove}
        onDropdownToggle={handleDropdownToggle}
        onClearAll={clearFilters}
      />

      <JobsList
        jobs={filteredJobs}
        savedJobIds={savedJobs}
        appliedJobIds={appliedJobs}
        onSaveJob={handleSaveJob}
        onApplyJob={handleApplyJob}
      />
    </div>
  );
};

export default JobsPage;
