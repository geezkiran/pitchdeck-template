export interface SlideProps {
  id: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
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
