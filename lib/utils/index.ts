import { Job, JobFilters } from "../types";
import { SCORE_THRESHOLDS } from "../constants";

/**
 * Combines CSS class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Get score classification based on value
 */
export function getScoreClass(score: number): string {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return "scoreGreat";
  if (score >= SCORE_THRESHOLDS.GOOD) return "scoreAverage";
  return "scorePoor";
}

/**
 * Get score label based on value
 */
export function getScoreLabel(score: number): string {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return "GREAT";
  if (score >= SCORE_THRESHOLDS.GOOD) return "AVERAGE";
  return "POOR";
}

/**
 * Convert time posted to relative time
 */
export function getTimeAgo(timePosted: string): string {
  const hours = parseInt(timePosted.split(" ")[0]);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Format salary for display
 */
export function formatSalary(salary: string): string {
  return salary.replace(/₹(\d+),(\d+),(\d+)/, "₹$1.$2L");
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Check if job matches search term
 */
export function matchesSearchTerm(job: Job, searchTerm: string): boolean {
  const term = searchTerm.toLowerCase();
  return (
    job.title.toLowerCase().includes(term) ||
    job.company.toLowerCase().includes(term) ||
    job.location.toLowerCase().includes(term) ||
    job.skills.some((skill) => skill.toLowerCase().includes(term))
  );
}

/**
 * Filter jobs based on filters
 */
export function filterJobs(
  jobs: Job[],
  filters: JobFilters,
  searchTerm: string = ""
): Job[] {
  let filteredJobs = [...jobs];

  // Search term filter
  if (searchTerm) {
    filteredJobs = filteredJobs.filter((job) =>
      matchesSearchTerm(job, searchTerm)
    );
  }

  // Experience level filter
  if (filters.experienceLevel) {
    filteredJobs = filteredJobs.filter((job) =>
      job.experience.includes(filters.experienceLevel)
    );
  }

  // Company filter
  if (filters.company) {
    filteredJobs = filteredJobs.filter((job) =>
      job.company.toLowerCase().includes(filters.company.toLowerCase())
    );
  }

  // Industry filter
  if (filters.industry) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.skills.some((skill) =>
          skill.toLowerCase().includes(filters.industry.toLowerCase())
        ) ||
        job.title.toLowerCase().includes(filters.industry.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.industry.toLowerCase())
    );
  }

  // Internship filter
  if (filters.internship) {
    filteredJobs = filteredJobs.filter((job) =>
      job.type.toLowerCase().includes("intern")
    );
  }

  // Work arrangement filters
  if (filters.onsite) {
    filteredJobs = filteredJobs.filter(
      (job) => job.workArrangement === "From Office"
    );
  }

  if (filters.hybrid) {
    filteredJobs = filteredJobs.filter(
      (job) => job.workArrangement === "Hybrid"
    );
  }

  if (filters.remote) {
    filteredJobs = filteredJobs.filter(
      (job) => job.workArrangement === "Remote"
    );
  }

  if (filters.workArrangement) {
    filteredJobs = filteredJobs.filter(
      (job) => job.workArrangement === filters.workArrangement
    );
  }

  return filteredJobs;
}

/**
 * Sort jobs by relevance/date
 */
export function sortJobs(
  jobs: Job[],
  sortBy: "relevance" | "date" | "salary" = "relevance"
): Job[] {
  return [...jobs].sort((a, b) => {
    switch (sortBy) {
      case "relevance":
        return (b.matchScore || 0) - (a.matchScore || 0);
      case "date":
        return new Date(b.posted).getTime() - new Date(a.posted).getTime();
      case "salary":
        const aSalary = parseInt(a.salary.replace(/[^\d]/g, ""));
        const bSalary = parseInt(b.salary.replace(/[^\d]/g, ""));
        return bSalary - aSalary;
      default:
        return 0;
    }
  });
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Format date for display
 */
export function formatDate(date: Date | undefined): string {
  if (!date) return "";
  return (
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })?.format(date) || ""
  );
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2);
}
