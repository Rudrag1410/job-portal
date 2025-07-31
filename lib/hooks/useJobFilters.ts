import { useState, useMemo } from "react";
import { Job, JobFilters, ActiveTab } from "../types";
import { filterJobs, sortJobs } from "../utils";

interface UseJobFiltersProps {
  jobs: Job[];
  savedJobIds: string[];
  appliedJobIds: string[];
}

interface UseJobFiltersReturn {
  filteredJobs: Job[];
  filters: JobFilters;
  searchTerm: string;
  activeTab: ActiveTab;
  activeDropdown: string | null;
  setSearchTerm: (term: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setActiveDropdown: (dropdown: string | null) => void;
  handleFilterChange: (filterType: string, value: string | boolean) => void;
  handleFilterRemove: (filterType: string) => void;
  handleDropdownToggle: (dropdown: string) => void;
  clearFilters: () => void;
}

const initialFilters: JobFilters = {
  experienceLevel: "",
  company: "",
  internship: false,
  onsite: false,
  hybrid: false,
  remote: false,
  workArrangement: "",
};

export function useJobFilters({
  jobs,
  savedJobIds,
  appliedJobIds,
}: UseJobFiltersProps): UseJobFiltersReturn {
  const [filters, setFilters] = useState<JobFilters>(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("recommended");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filteredJobs = useMemo(() => {
    let jobsToFilter: Job[] = [];

    // Filter by tab first
    switch (activeTab) {
      case "saved":
        jobsToFilter = jobs.filter((job) => savedJobIds.includes(job.id));
        break;
      case "applied":
        jobsToFilter = jobs.filter((job) => appliedJobIds.includes(job.id));
        break;
      default:
        jobsToFilter = jobs;
    }

    // Apply filters and search
    const filtered = filterJobs(jobsToFilter, filters, searchTerm);

    // Sort by relevance
    return sortJobs(filtered, "relevance");
  }, [jobs, filters, searchTerm, activeTab, savedJobIds, appliedJobIds]);

  const handleFilterChange = (filterType: string, value: string | boolean) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setActiveDropdown(null);
  };

  const handleFilterRemove = (filterType: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]:
        typeof prev[filterType as keyof JobFilters] === "boolean" ? false : "",
    }));
  };

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setSearchTerm("");
    setActiveDropdown(null);
  };

  return {
    filteredJobs,
    filters,
    searchTerm,
    activeTab,
    activeDropdown,
    setSearchTerm,
    setActiveTab,
    setActiveDropdown,
    handleFilterChange,
    handleFilterRemove,
    handleDropdownToggle,
    clearFilters,
  };
}
