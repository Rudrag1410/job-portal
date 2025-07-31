"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "@/lib/hooks";
import {
  SAVED_JOBS_STORAGE_KEY,
  APPLIED_JOBS_STORAGE_KEY,
} from "@/lib/constants";

interface JobsContextType {
  savedJobs: string[];
  appliedJobs: string[];
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  applyToJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  isJobApplied: (jobId: string) => boolean;
  toggleSaveJob: (jobId: string) => void;
  savedJobsCount: number;
  appliedJobsCount: number;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

interface JobsProviderProps {
  children: ReactNode;
}

export function JobsProvider({ children }: JobsProviderProps) {
  const [savedJobs, setSavedJobs] = useLocalStorage<string[]>(
    SAVED_JOBS_STORAGE_KEY,
    []
  );

  const [appliedJobs, setAppliedJobs] = useLocalStorage<string[]>(
    APPLIED_JOBS_STORAGE_KEY,
    []
  );

  const saveJob = (jobId: string) => {
    setSavedJobs((prev) => {
      if (!prev.includes(jobId)) {
        return [...prev, jobId];
      }
      return prev;
    });
  };

  const unsaveJob = (jobId: string) => {
    setSavedJobs((prev) => prev.filter((id) => id !== jobId));
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter((id) => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  };

  const applyToJob = (jobId: string) => {
    setAppliedJobs((prev) => {
      if (!prev.includes(jobId)) {
        return [...prev, jobId];
      }
      return prev;
    });
  };

  const isJobSaved = (jobId: string) => savedJobs.includes(jobId);
  const isJobApplied = (jobId: string) => appliedJobs.includes(jobId);

  const value: JobsContextType = {
    savedJobs,
    appliedJobs,
    saveJob,
    unsaveJob,
    applyToJob,
    isJobSaved,
    isJobApplied,
    toggleSaveJob,
    savedJobsCount: savedJobs.length,
    appliedJobsCount: appliedJobs.length,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobsProvider");
  }
  return context;
}
