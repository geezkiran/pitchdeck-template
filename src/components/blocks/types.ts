export interface SlideProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: "default" | "muted" | "gradient" | "dark";
}

export interface BlockProps {
  className?: string;
}

export interface StatItem {
  value: React.ReactNode;
  label: string;
  description?: string;
}

export interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

export interface TeamMemberData {
  name: string;
  role: string;
  bio?: string;
  initials: string;
}

export interface BulletItem {
  text: string;
  highlight?: boolean;
}
