export interface SlideProps {
  id: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: "default" | "muted" | "gradient" | "dark";
  /** When false, content stays top-aligned within the main area (e.g. full-bleed charts). */
  centerContent?: boolean;
  /** Pin footer to the bottom of the slide, just above nav (excluded from vertical centering). */
  pinFooter?: boolean;
  footerClassName?: string;
}

export interface BlockProps {
  className?: string;
}

export interface StatItem {
  value: React.ReactNode;
  label: string;
  description?: string;
}
