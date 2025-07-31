// Core application types

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  type: string;
  workArrangement: string;
  requirements: string[];
  benefits: string[];
  posted: string;
  companyLogo: string;
  companyDescription: string;
  experience: string;
  connections: number;
  score: number;
  scoreLabel: string;
  timePosted: string;
  appliedStatus?: string;
  matchScore: number;
  about: string;
  jobDetails: string[];
  qualifications: {
    required: string[];
    additional: string[];
  };
  postedBy: string;
  openings: number;
  applicants: string;
  skills: string[];
  companyRating: number;
  reviewCount: string;
}

export interface JobFilters {
  experienceLevel: string;
  company: string;
  industry: string;
  internship: boolean;
  onsite: boolean;
  hybrid: boolean;
  remote: boolean;
  workArrangement: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface FilterOption {
  label: string;
  icon: string;
  key: string;
  options?: string[];
  toggle?: boolean;
}

export interface MenuItem {
  name: string;
  icon: string;
  active: boolean;
  href: string;
  badge?: string;
}

export type ActiveTab = "recommended" | "saved" | "applied";

export type ActivePage = "jobs" | "profile";

// UI Component types
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: string;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

export interface IconProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export interface BadgeProps {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  clickable?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: Array<{
    label: string;
    value: string;
    icon?: string;
  }>;
  onSelect: (value: string) => void;
  className?: string;
}

export interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}
