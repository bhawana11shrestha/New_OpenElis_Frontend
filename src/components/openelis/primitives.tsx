import { cn } from "@/lib/utils";
import {
  Search,
  FileText,
  FlaskConical,
  Printer,
  Tag,
  Check,
  Copy,
  Bell,
  HelpCircle,
  ChevronDown,
  Plus,
  type LucideIcon,
} from "lucide-react";

export const ICONS = {
  search: Search,
  file: FileText,
  flask: FlaskConical,
  print: Printer,
  tag: Tag,
  check: Check,
  copy: Copy,
  bell: Bell,
  help: HelpCircle,
  chevron: ChevronDown,
  plus: Plus,
} as const satisfies Record<string, LucideIcon>;

export function PageWrap({ children }: { children: React.ReactNode }) {
  return <main className="flex-1 px-6 py-6 animate-fade-in">{children}</main>;
}

export function Card({
  title,
  children,
  action,
}: {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="mb-6 rounded-xl border border-border bg-card shadow-elegant overflow-hidden">
      {title && (
        <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-gradient-surface">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          {action}
        </div>
      )}
      <div className="p-6">{children}</div>
    </section>
  );
}

export function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-base placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20",
        props.className,
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-base focus:border-ring focus:ring-2 focus:ring-ring/20",
        props.className,
      )}
    />
  );
}

export function Badge({ value }: { value: string }) {
  const styles: Record<string, string> = {
    Urgent: "bg-destructive/10 text-destructive border-destructive/20",
    Critical: "bg-destructive/10 text-destructive border-destructive/20",
    "QC impacted": "bg-destructive/10 text-destructive border-destructive/20",
    Entered: "bg-info/10 text-info border-info/20",
    Validated: "bg-success/10 text-success border-success/20",
    "Self Validation": "bg-success/10 text-success border-success/20",
    Normal: "bg-success/10 text-success border-success/20",
    "Supervisor Validation": "bg-accent/20 text-accent-foreground border-accent/30",
    Pending: "bg-warning/15 text-warning-foreground border-warning/30",
    Amended: "bg-warning/15 text-warning-foreground border-warning/30",
    "Referred out": "bg-muted text-muted-foreground border-border",
  };
  const cls = styles[value] ?? "bg-muted text-muted-foreground border-border";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        cls,
      )}
    >
      {value}
    </span>
  );
}

export function ActionIcon({
  type,
  onClick,
  title,
}: {
  type: keyof typeof ICONS;
  onClick?: () => void;
  title?: string;
}) {
  const Cmp = ICONS[type];
  return (
    <button
      type="button"
      onClick={onClick}
      title={title ?? type}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-base hover:border-primary/40 hover:bg-secondary hover:text-primary",
      )}
    >
      <Cmp className={cn("h-4 w-4", type === "flask" && "text-primary")} />
    </button>
  );
}

export function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-semibold text-foreground">{value}</p>
    </div>
  );
}

export function Metric({
  value,
  label,
  tone = "text-foreground",
  dot,
}: {
  value: string | number;
  label: string;
  tone?: string;
  dot?: boolean;
}) {
  return (
    <div className="flex-1 border-r border-border px-5 py-1 last:border-r-0">
      <div className={cn("text-2xl font-bold flex items-center gap-2", tone)}>
        {dot && <span className="inline-block h-2 w-2 rounded-full bg-destructive animate-pulse-soft" />}
        {value}
      </div>
      <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-base hover:shadow-elevated hover:brightness-110 active:scale-[0.98]",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 text-sm font-semibold text-foreground transition-base hover:bg-muted",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function OutlineButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border border-primary/30 bg-background px-4 py-2 text-sm font-semibold text-primary transition-base hover:bg-primary/5",
        className,
      )}
    >
      {children}
    </button>
  );
}
