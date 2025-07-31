import { FilterOption } from "../types";
import { COMPANIES } from "./companies";
import { EXPERIENCE_LEVELS } from "./experienceLevel";
import { FAQ_RESPONSES } from "./faq";
import { INDUSTRIES } from "./industries";

export const APP_NAME = "Joblo.ai";
export const APP_DESCRIPTION = "Your AI-powered job search platform";

export const SAVED_JOBS_STORAGE_KEY = "savedJobs";
export const APPLIED_JOBS_STORAGE_KEY = "appliedJobs";

export const WORK_ARRANGEMENTS = ["Remote", "Hybrid", "From Office"] as const;

export const FILTER_OPTIONS: FilterOption[] = [
  {
    label: "Experience level",
    icon: "ri-bar-chart-line",
    key: "experienceLevel",
    options: Array.from(EXPERIENCE_LEVELS),
  },
  {
    label: "Company",
    icon: "ri-building-line",
    key: "company",
    options: Array.from(COMPANIES),
  },
  {
    label: "Industry",
    icon: "ri-briefcase-line",
    key: "industry",
    options: Array.from(INDUSTRIES),
  },
  {
    label: "Internship",
    icon: "ri-graduation-cap-line",
    key: "internship",
    toggle: true,
  },
  {
    label: "Remote",
    icon: "ri-home-wifi-line",
    key: "remote",
    toggle: true,
  },
  {
    label: "Hybrid",
    icon: "ri-building-2-line",
    key: "hybrid",
    toggle: true,
  },
  {
    label: "On-site",
    icon: "ri-map-pin-line",
    key: "onsite",
    toggle: true,
  },
];

export const QUICK_QUESTIONS = Object.keys(FAQ_RESPONSES);

export const SCORE_THRESHOLDS = {
  EXCELLENT: 75,
  GOOD: 50,
} as const;

export const DEFAULT_USER = {
  name: "Sun Goku",
  title: "Junior Consultant",
  avatar:
    "https://imgcdn.stablediffusionweb.com/2024/11/9/9dc81b3b-00ab-41a6-8ad6-ae062d465e2e.jpg",
};
